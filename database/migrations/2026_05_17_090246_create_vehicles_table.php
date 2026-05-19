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
      
{
    
{
    Schema::create('vehicles', function (Blueprint $table) {
        $table->id();
        $table->string('brand'); 
        $table->string('model'); 
        $table->string('image')->nullable(); // 👈 Ajoute cette ligne pour stocker l'URL de la photo
        $table->string('fuel_type'); 
        $table->integer('daily_price'); 
        $table->string('type'); 
        $table->string('status')->default('Disponible'); 
        $table->integer('mileage')->default(0);
        $table->integer('next_maintenance_mileage'); 
        $table->string('transmission'); 
        $table->integer('seats');        
        $table->integer('doors');        
        $table->boolean('air_conditioning')->default(true); 
        $table->timestamps();
    });
}
}
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicles');
    }
};
