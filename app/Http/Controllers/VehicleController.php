<?php

namespace App\Http\Controllers;

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
    
    // ... garde tes autres fonctions en dessous (show, etc.)
}