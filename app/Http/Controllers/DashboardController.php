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
        $user = Auth::user();

        // 1. Sécurité : On bloque si ce n'est pas l'admin
        if ($user->role !== 'admin') {
            abort(403, 'Accès strictement réservé à la direction de DriveFlow.');
        }

        // 2. On récupère toutes les réservations
        $bookings = Booking::with(['user', 'vehicle'])->latest()->get();

        // 3. --- CALCUL DES KPI ---
        // On calcule le revenu, le nombre de clients, et on compte les statuts
        $revenue = Booking::where('status', 'Confirmé')->sum('total_price');
        
        $totalClients = \App\Models\User::where('role', 'client')->count();
        
        $statusStats = Booking::selectRaw('COALESCE(status, "En attente") as status, count(*) as count')
            ->groupBy('status')
            ->get();

        // 4. On envoie TOUT à la page React (C'est ici que ça bloquait !)
        return Inertia::render('Dashboard', [
            'bookings' => $bookings,
            'kpis' => [
                'revenue' => $revenue,
                'total_clients' => $totalClients,
                'total_bookings' => $bookings->count(),
                'status_stats' => $statusStats
            ]
        ]);
    }
}