<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Storage;


use Illuminate\Http\Request;
use App\Models\Vehicle;
use Inertia\Inertia;

class VehicleController extends Controller
{
    public function index(Request $request)
    {
        // On prépare la requête sans l'exécuter tout de suite
        $query = Vehicle::query();

        // Si le client a tapé quelque chose dans la recherche...
       if ($request->filled('search')) {
    $searchTerm = strtolower($request->search); // On force en minuscules
    
    $query->whereRaw('LOWER(brand) like ?', ['%' . $searchTerm . '%'])
          ->orWhereRaw('LOWER(model) like ?', ['%' . $searchTerm . '%']);
}

        // On récupère les résultats finaux
        $vehicles = $query->get();
        



        return Inertia::render('Catalog/Index', [
            'vehicles' => $vehicles,
            // On renvoie aussi le mot cherché à React pour le garder dans la barre de texte
            'filters' => $request->only('search') 
        ]);
    }
 public function store(Request $request)
{
    //dd('TEST 1 : Données reçues par Laravel', $request->all());
    $validated = $request->validate([
        'brand'                     => 'required|string',
        'model'                     => 'required|string',
        'type'                      => 'required|string',
        'daily_price'               => 'required|numeric',
        'transmission'              => 'required|string',
        'fuel_type'                 => 'required|string',
        'seats'                     => 'required|integer',
        'doors'                     => 'required|integer', // Validation portes
        'mileage'                   => 'required|numeric', // Validation kilométrage
        'next_maintenance_mileage'  => 'required|numeric',
        'air_conditioning'             => 'required|boolean', // Validation climatisation (1 ou 0)
        'status'                    => 'required|string',
        'image'                     => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
    ]);
    //dd('TEST 2 : La validation a réussi !', $validated);

    if ($request->hasFile('image')) {
        $path = $request->file('image')->store('vehicles', 'public');
        $validated['image'] = $path;
    }

    Vehicle::create($validated);

    return redirect()->back()->with('success', 'Véhicule ajouté avec succès !');
}
public function destroy(Vehicle $vehicle)
{
    // 1. Supprimer l'image physique du dossier public/storage
    if ($vehicle->image) {
        Storage::disk('public')->delete($vehicle->image);
    }

    // 2. Supprimer la ligne dans la base de données MySQL
    $vehicle->delete();

    // 3. Recharger la page avec un message
    return redirect()->back()->with('success', 'Véhicule retiré de la flotte avec succès !');
}
public function show(\App\Models\Vehicle $vehicle)
{
    // On envoie la voiture spécifique à une nouvelle page React appelée "Show"
    return inertia('Catalog/Show', [
        'vehicle' => $vehicle
    ]);
}
    // ... garde tes autres fonctions en dessous (show, etc.)
}
