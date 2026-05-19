<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;

class Citadine extends Vehicle
{
    // On indique à Laravel de continuer à utiliser la table 'vehicles' de son parent
    protected $table = 'vehicles';

    protected static function booted()
    {
        // 1. LECTURE : Quand on demande des Citadines, on filtre automatiquement la colonne 'type'
        static::addGlobalScope('citadine', function (Builder $builder) {
            $builder->where('type', 'Citadine');
        });

        // 2. ÉCRITURE : Quand on crée une Citadine en BDD, on force la colonne 'type' à 'Citadine'
        static::creating(function ($vehicle) {
            $vehicle->type = 'Citadine';
        });
    }
}