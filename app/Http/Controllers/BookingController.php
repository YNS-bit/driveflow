<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Mail;
use App\Mail\BookingConfirmation;
use Illuminate\Http\Request;
use App\Models\Booking;
use Inertia\Inertia; // 👈 Outil indispensable pour envoyer des pages React

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
    // On cherche la réservation, en s'assurant qu'elle appartient bien au client connecté !
    $booking = Booking::with('vehicle', 'user')
                ->where('user_id', Auth::id())
                ->findOrFail($id);

    // On charge la vue Blade qu'on a créée à l'étape 2
    $pdf = Pdf::loadView('pdf.invoice', ['booking' => $booking]);

    // On force le téléchargement
    return $pdf->download('facture_driveflow_' . $booking->id . '.pdf');
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
            'user_id' => Auth::id(),
            'vehicle_id' => $request->vehicle_id,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'total_price' => $request->total_price,
            'status' => 'En attente'
        ]);
        Mail::to(Auth::user()->email)->send(new BookingConfirmation($booking));

        return redirect()->back()->with('success', 'Votre réservation a bien été enregistrée !');
        
    }
}
