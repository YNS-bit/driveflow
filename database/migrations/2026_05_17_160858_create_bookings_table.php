<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            // On relie la réservation à la voiture
            $table->foreignId('vehicle_id')->constrained()->onDelete('cascade'); 
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            
            $table->date('start_date');
            $table->date('end_date');
            $table->integer('total_price'); // Le prix calculé en DH
            $table->string('status')->default('En attente'); // Statut par défaut
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
