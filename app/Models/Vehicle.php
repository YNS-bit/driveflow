<?php

namespace App\Models;

use App\Enums\VehicleStatus;
use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{    

    protected $fillable = [
        'brand', 
        'model', 
        'image', 
        'fuel_type', 
        'daily_price', 
        'type', 
        'status', 
        'mileage',                  // Ajouté
        'next_maintenance_mileage', 
        'transmission', 
        'seats', 
        'doors',                    // Ajouté
        'air_conditioning' ,
        'description',
        'features',               // Ajouté
    ];
    

   protected $casts = [
    'status' => VehicleStatus::class,
    'features' => 'array',
];

    // Un raccourci (Scope) pour récupérer facilement que les véhicules dispos
    public function scopeAvailable($query)
    {
        return $query->where('status', VehicleStatus::DISPONIBLE);
    }
    public function show(\App\Models\Vehicle $vehicle)
{
    // On charge la vue React 'Show' et on lui passe les données de la voiture cliquée
    return inertia('Catalog/Show', [
        'vehicle' => $vehicle
    ]);
}
}