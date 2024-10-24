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
        Schema::table('estudiantesgrupos', function (Blueprint $table) {
            $table->foreign(['idEstudiante'], 'FK_Relationship_11')->references(['idEstudiante'])->on('estudiante')->onUpdate('restrict')->onDelete('restrict');
            $table->foreign(['idGrupo'], 'FK_Relationship_12')->references(['idGrupo'])->on('grupo')->onUpdate('restrict')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('estudiantesgrupos', function (Blueprint $table) {
            $table->dropForeign('FK_Relationship_11');
            $table->dropForeign('FK_Relationship_12');
        });
    }
};
