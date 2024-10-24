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
        Schema::create('estudiantesgrupos', function (Blueprint $table) {
            $table->integer('idEstudiante');
            $table->integer('idGrupo')->index('fk_relationship_12');

            $table->primary(['idEstudiante', 'idGrupo']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('estudiantesgrupos');
    }
};
