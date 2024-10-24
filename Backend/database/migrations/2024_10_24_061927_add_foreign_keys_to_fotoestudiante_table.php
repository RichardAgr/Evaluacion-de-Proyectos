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
        Schema::table('fotoestudiante', function (Blueprint $table) {
            $table->foreign(['idEstudiante'], 'FK_fk_FotoEstudiante_Estudiante')->references(['idEstudiante'])->on('estudiante')->onUpdate('restrict')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('fotoestudiante', function (Blueprint $table) {
            $table->dropForeign('FK_fk_FotoEstudiante_Estudiante');
        });
    }
};
