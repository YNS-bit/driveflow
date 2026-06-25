<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Mail;
use App\Mail\BookingConfirmation;
use Illuminate\Http\Request;
use App\Models\Booking;
use Inertia\Inertia; // 👈 Outil indispensable pour envoyer des pages React
use Stripe\Stripe;
use Stripe\Checkout\Session;


class BookingController extends Controller
{
    // --- NOUVELLE MÉTHODE : Afficher l'historique ---
    public function index()
    {
        // On récupère les réservations (de la plus récente à la plus ancienne)
        // Le "with('vehicle')" est magique : il récupère la voiture associée en même temps !
        $bookings = Booking::with('vehicle')->latest()->get();

        // On demande à Inertia d'afficher une page React et on lui donne nos données
        return Inertia::render('Bookings/Index', [
            'bookings' => $bookings
        ]);
    }
    public function downloadInvoice($id)
{
    // 1. On cherche la réservation par son ID
    // On enlève le ->findOrFail($id) temporairement pour tester si la route est captée
    $booking = Booking::with('vehicle', 'user')->find($id);

    // 2. Si rien n'est trouvé, au lieu d'une 404, on va déboguer
    if (!$booking) {
        return "Erreur : Aucune réservation trouvée avec l'ID " . $id;
    }

    // 3. Vérification de sécurité (le client doit être le propriétaire)
    if ($booking->user_id !== Auth::id()) {
        return "Accès refusé : Cette facture ne vous appartient pas.";
    }

    // 4. Génération du PDF
    try {
        $pdf = Pdf::loadView('pdf.invoice', ['booking' => $booking]);
        return $pdf->download('facture_driveflow_' . $booking->id . '.pdf');
    } catch (\Exception $e) {
        return "Erreur lors de la génération du PDF : " . $e->getMessage();
    }
}

    // --- ANCIENNE MÉTHODE : Créer une réservation (On n'y touche pas) ---
    public function store(Request $request)
    {
        $request->validate([
            'vehicle_id' => 'required|exists:vehicles,id',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'total_price' => 'required|numeric'
        ]);

        $booking = Booking::create([
           'user_id' => $request->user()->id,
            'vehicle_id' => $request->vehicle_id,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'total_price' => $request->total_price,
            'status' => 'En attente',
        ]);
        Mail::to(Auth::user()->email)->send(new BookingConfirmation($booking));

        return redirect()->back()->with('success', 'Votre réservation a bien été enregistrée !');
        
    }
    public function pay($id)
{
    // On récupère la réservation du client
    $booking = Booking::where('user_id', Auth::id())->findOrFail($id);

    // On configure Stripe avec ta clé secrète du .env
    Stripe::setApiKey(env('STRIPE_SECRET'));

    // On crée la session de paiement chez Stripe
    $session = Session::create([
        'payment_method_types' => ['card'],
        'line_items' => [[
            'price_data' => [
                'currency' => 'mad', // Devise : Dirham marocain
                'product_data' => [
                    'name' => 'Location de véhicule DriveFlow',
                    'description' => 'Du ' . $booking->start_date . ' au ' . $booking->end_date,
                ],
                // Stripe calcule en centimes, donc on multiplie par 100
                'unit_amount' => $booking->total_price * 100, 
            ],
            'quantity' => 1,
        ]],
        'mode' => 'payment',
        // Redirection si le paiement réussit
        'success_url' => route('bookings.success', ['id' => $booking->id]), 
        // Redirection si le client clique sur "Retour"
        'cancel_url' => route('bookings.index'), 
    ]);

    // On force la redirection vers la page de paiement sécurisée de Stripe
    return Inertia::location($session->url);
}

public function success($id)
{
    // Le client a payé ! On passe le statut à "Approuvée" (ou "Payée")
    $booking = Booking::where('user_id', Auth::id())->findOrFail($id);
    $booking->update(['status' => 'Approuvée']);

    return redirect()->route('bookings.index');
}
}
