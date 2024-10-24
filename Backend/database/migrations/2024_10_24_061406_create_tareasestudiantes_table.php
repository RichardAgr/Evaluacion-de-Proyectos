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
        Schema::create('tareasestudiantes', function (Blueprint $table) {
            $table->integer('idEstudiante');
            $table->integer('idTarea')->index('fk_relationship_17');

            $table->primary(['idEstudiante', 'idTarea']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tareasestudiantes');
    }
};
