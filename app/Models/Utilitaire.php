<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;

class Utilitaire extends Vehicle
{
    // On indique à Laravel de continuer à utiliser la table 'vehicles' de son parent
    protected $table = 'vehicles';

    protected static function booted()
    {
        // 1. LECTURE : Quand on demande des Utilitaires, on filtre automatiquement la colonne 'type'
        static::addGlobalScope('utilitaire', function (Builder $builder) {
            $builder->where('type', 'Utilitaire');
        });

        // 2. ÉCRITURE : Quand on crée un Utilitaire en BDD, on force la colonne 'type' à 'Utilitaire'
        static::creating(function ($vehicle) {
            $vehicle->type = 'Utilitaire';
        });
    }
}