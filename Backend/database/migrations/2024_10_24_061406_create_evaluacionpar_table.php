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
        Schema::create('evaluacionpar', function (Blueprint $table) {
            $table->integer('idevaluacionPar', true);
            $table->integer('idEmpresa');
            $table->integer('idEstudianteEvaluado');
            $table->integer('idEstudianteEvaluador');
            $table->integer('idCriterio')->index('fk_evaluacionpar_criterio1_idx');
            $table->integer('nota')->nullable();

            $table->index(['idEmpresa', 'idEstudianteEvaluador'], 'fk_evaluacionpar_estudiantesempresas_evaluador');
            $table->index(['idEmpresa', 'idEstudianteEvaluado', 'idEstudianteEvaluador'], 'fk_evaluacionpar_estudiantesempresas_idx');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('evaluacionpar');
    }
};
