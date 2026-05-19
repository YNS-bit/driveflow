<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;
use App\Models\Vehicle;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        if (!Auth::check() || Auth::user()->role !== 'admin') {
        abort(403, 'Accès strictement interdit.');
    }

    $vehicles = Vehicle::all();
    return Inertia::render('Admin/Index', ['vehicles' => $vehicles]);
        
        $vehicles = Vehicle::all();
        
        return Inertia::render('Admin/Index', [
            'vehicles' => $vehicles
        ]);
    }

    public function updateStatus(Request $request, $id)
    {
        if (!Auth::check() || Auth::user()->role !== 'admin') {
        abort(403, 'Accès strictement interdit.');
    }
        $request->validate(['status' => 'required|string']);
        
        $vehicle = Vehicle::findOrFail($id);
        $vehicle->status = $request->status;
        $vehicle->save();

        return redirect()->back()->with('success', 'Statut mis à jour !');
    }
}