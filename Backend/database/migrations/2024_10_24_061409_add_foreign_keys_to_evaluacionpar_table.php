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
        Schema::table('evaluacionpar', function (Blueprint $table) {
            $table->foreign(['idCriterio'], 'fk_evaluacionPar_criterio1')->references(['idCriterio'])->on('criterio')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['idEmpresa', 'idEstudianteEvaluado'], 'fk_evaluacionPar_estudiantesempresas')->references(['idEmpresa', 'idEstudiante'])->on('estudiantesempresas')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['idEmpresa', 'idEstudianteEvaluador'], 'fk_evaluacionPar_estudiantesempresas_evaluador')->references(['idEmpresa', 'idEstudiante'])->on('estudiantesempresas')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('evaluacionpar', function (Blueprint $table) {
            $table->dropForeign('fk_evaluacionPar_criterio1');
            $table->dropForeign('fk_evaluacionPar_estudiantesempresas');
            $table->dropForeign('fk_evaluacionPar_estudiantesempresas_evaluador');
        });
    }
};
