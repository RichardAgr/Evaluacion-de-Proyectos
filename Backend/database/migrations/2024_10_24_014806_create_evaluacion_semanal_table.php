<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEvaluacionsemanalTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('evaluacionsemanal', function (Blueprint $table) {
            $table->id('idEvaluacionsemanal');
            $table->unsignedBigInteger('idSprint');
            $table->unsignedBigInteger('idEstudiante');
            $table->tinyInteger('nota');
            $table->text('comentario');

            // * Llaves foraneas 
            // *  idSprint
            $table->foreign('idSprint')
                  ->references('idSprint')
                  ->on('sprint')
                  ->onDelete('cascade');
            // *   idEstudiante
            $table->foreign('idEstudiante')
                  ->references('idEstudiante')
                  ->on('estudiante')
                  ->onDelete('cascade');


        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('evaluacion_semanal');
    }
};
