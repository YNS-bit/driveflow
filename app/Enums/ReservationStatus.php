<?php

namespace App\Enums;

enum ReservationStatus: string
{
    case EN_ATTENTE = 'En attente';
    case CONFIRMEE = 'Confirmée';
    case ANNULEE = 'Annulée';
    case TERMINEE = 'Terminée';
}