<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
   public function up()
{
    Schema::table('vehicles', function (Blueprint $table) {
        // Ajoute une colonne JSON qui peut être vide (nullable)
        $table->json('features')->nullable()->after('description');
    });
}

public function down()
{
    Schema::table('vehicles', function (Blueprint $table) {
        $table->dropColumn('features');
    });
}
};
