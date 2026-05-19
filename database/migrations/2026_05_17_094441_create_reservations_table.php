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
        Schema::create('reservations', function (Blueprint $table) {
        $table->id();
        
        // Les clés étrangères qui relient l'utilisateur et le véhicule
        $table->foreignId('user_id')->constrained()->onDelete('cascade');
        $table->foreignId('vehicle_id')->constrained()->onDelete('cascade');
        
        // Les détails de la réservation
        $table->date('start_date');
        $table->date('end_date');
        $table->decimal('total_price', 8, 2);
        
        // Notre statut sécurisé par l'Enum
        $table->string('status')->default('En attente');
        
        $table->timestamps();
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
