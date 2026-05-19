<?php

namespace App\Enums;

enum VehicleStatus: string
{
    case DISPONIBLE = 'Disponible';
    case EN_MAINTENANCE = 'En maintenance';
    case EN_NETTOYAGE = 'En nettoyage';
    case LOUE = 'Loué'; 
    
    // (Si tu as d'autres statuts déjà présents, tu peux les laisser !)
}