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
        Schema::table('tareasestudiantes', function (Blueprint $table) {
            $table->foreign(['idTarea'], 'FK_Relationship_17')->references(['idTarea'])->on('tarea')->onUpdate('restrict')->onDelete('restrict');
            $table->foreign(['idEstudiante'], 'FK_Relationship_18')->references(['idEstudiante'])->on('estudiante')->onUpdate('restrict')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tareasestudiantes', function (Blueprint $table) {
            $table->dropForeign('FK_Relationship_17');
            $table->dropForeign('FK_Relationship_18');
        });
    }
};
