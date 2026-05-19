<?php

namespace App\Models;

use App\Enums\ReservationStatus;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    protected $fillable = [
        'user_id',
        'vehicle_id',
        'start_date',
        'end_date',
        'total_price',
        'status'
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'status' => ReservationStatus::class,
    ];

    // Une réservation appartient à un Utilisateur
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Une réservation appartient à un Véhicule
    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class);
    }
}