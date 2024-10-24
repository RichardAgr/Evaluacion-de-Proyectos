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
        Schema::table('estudiantesempresas', function (Blueprint $table) {
            $table->foreign(['idEstudiante'], 'FK_Relationship_14')->references(['idEstudiante'])->on('estudiante')->onUpdate('restrict')->onDelete('restrict');
            $table->foreign(['idEmpresa'], 'FK_Relationship_15')->references(['idEmpresa'])->on('empresa')->onUpdate('restrict')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('estudiantesempresas', function (Blueprint $table) {
            $table->dropForeign('FK_Relationship_14');
            $table->dropForeign('FK_Relationship_15');
        });
    }
};
