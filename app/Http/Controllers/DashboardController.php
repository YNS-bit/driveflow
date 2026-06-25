<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Booking;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
  public function index()
{
    $bookings = Booking::with('vehicle', 'user')->latest()->get();

    $revenue = Booking::where('status', 'Approuvée')->sum('total_price');
    $totalReservations = Booking::count();
    $clientsActifs = Booking::distinct('user_id')->count('user_id');

    $kpis = [
        'revenue' => $revenue,
        'total_bookings' => $totalReservations,
        'total_clients' => $clientsActifs,
    ];

    // --- C'EST ICI QU'IL FAUT CRÉER LA VARIABLE ---
    $chartData = Booking::where('status', 'Approuvée')
        ->orderBy('created_at')
        ->get()
        ->groupBy(function($booking) {
            return $booking->created_at->format('d M');
        })
        ->map(function($group, $date) {
            return [
                'date' => $date,
                'Revenus' => $group->sum('total_price')
            ];
        })->values();
    // ----------------------------------------------

    return Inertia::render('Dashboard', [
        'bookings' => $bookings,
        'kpis' => $kpis,
        'chartData' => $chartData  // Maintenant, cette ligne ne sera plus en erreur !
    ]);
}
    // N'oublie pas d'importer le modèle tout en haut du fichier si ce n'est pas fait :
    // use App\Models\Booking;

    public function approve($id)
    {
        // 1. On cherche la réservation précise grâce à son ID
        $booking = Booking::findOrFail($id);

        // 2. On met à jour son statut
        $booking->status = 'Approuvée'; // Mets le texte exact que tu utilises (ex: 'Validée', 'Approved', etc.)

        // 3. On sauvegarde la modification dans la base de données
        $booking->save();

        // 4. On rafraîchit la page avec un petit message de succès
        return redirect()->back()->with('success', 'La réservation a été approuvée avec succès !');
    }
    public function reject($id)
    {
        $booking = Booking::findOrFail($id);
        $booking->status = 'Rejetée'; // ou 'Annulée'
        $booking->save();

        return redirect()->back()->with('success', 'La réservation a été refusée.');
    }
    
}