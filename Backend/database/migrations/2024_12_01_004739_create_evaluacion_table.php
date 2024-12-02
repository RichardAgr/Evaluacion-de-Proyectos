<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEvaluacionTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('evaluacion', function (Blueprint $table) {
            $table->id('idEvaluacion');
            $table->unsignedBigInteger('idGrupo');
            $table->unsignedBigInteger('idEvaluadorEmpresa')->nullable();
            $table->unsignedBigInteger('idEvaluadorEstudiante')->nullable();
            $table->unsignedBigInteger('idEvaluadoEstudiante');
            $table->enum('tipoEvaluacion', ['cruzada', 'autoevaluacion', 'pares']);
            $table->time('horaEvaluacion');

            // * Llaves foráneas
            $table->foreign('idGrupo')->references('idGrupo')->on('grupo');
            $table->foreign('idEvaluadorEmpresa')->references('idEmpresa')->on('empresa');
            $table->foreign('idEvaluadorEstudiante')->references('idEstudiante')->on('estudiante');
            $table->foreign('idEvaluadoEstudiante')->references('idEstudiante')->on('estudiante');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('evaluacion');
    }
};
