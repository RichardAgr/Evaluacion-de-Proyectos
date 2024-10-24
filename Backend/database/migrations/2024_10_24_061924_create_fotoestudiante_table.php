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
        Schema::create('fotoestudiante', function (Blueprint $table) {
            $table->integer('idFoto', true)->unique('idfoto');
            $table->longText('foto')->nullable();
            $table->integer('idEstudiante')->nullable()->index('fk_fk_fotoestudiante_estudiante');

            $table->primary(['idFoto']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fotoestudiante');
    }
};
