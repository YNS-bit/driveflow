<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;

class Suv extends Vehicle
{
    // On indique à Laravel de continuer à utiliser la table 'vehicles' de son parent
    protected $table = 'vehicles';

    protected static function booted()
    {
        // 1. LECTURE : Quand on demande des SUV, on filtre automatiquement la colonne 'type'
        static::addGlobalScope('suv', function (Builder $builder) {
            $builder->where('type', 'SUV');
        });

        // 2. ÉCRITURE : Quand on crée un SUV en BDD, on force la colonne 'type' à 'SUV'
        static::creating(function ($vehicle) {
            $vehicle->type = 'SUV';
        });
    }
}