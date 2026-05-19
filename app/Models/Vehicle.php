<?php

namespace App\Models;

use App\Enums\VehicleStatus;
use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    // Les colonnes qu'on a le droit de remplir via un formulaire
    protected $fillable = [
        
    'brand', 'model', 'image', 'fuel_type', 'daily_price', 'type', 'status', 'mileage', 'next_maintenance_mileage', 'transmission', 'seats', 'doors', 'air_conditioning'
];
    

    // On transforme la chaîne de texte de la BDD en Enum PHP
    protected $casts = [
        'status' => VehicleStatus::class,
    ];

    // Un raccourci (Scope) pour récupérer facilement que les véhicules dispos
    public function scopeAvailable($query)
    {
        return $query->where('status', VehicleStatus::DISPONIBLE);
    }
}