<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEvaluacionParTable extends Migration
{
    public function up()
    {
        Schema::create('evaluacionPar', function (Blueprint $table) {
            $table->id('idevaluacionPar');
            $table->unsignedBigInteger('idEmpresa');
            $table->unsignedBigInteger('idEstudianteEvaluado');
            $table->unsignedBigInteger('idEstudianteEvaluador');
            $table->unsignedBigInteger('idCriterio');
            $table->integer('nota')->nullable();

            // Índices
            $table->index(['idEmpresa', 'idEstudianteEvaluado', 'idEstudianteEvaluador'], 'fk_evaluacionPar_estudiantesempresas_idx');
            $table->index('idCriterio', 'fk_evaluacionPar_criterio1_idx');

            // Relaciones
            $table->foreign(['idEmpresa', 'idEstudianteEvaluado'])
                ->references(['idEmpresa', 'idEstudiante'])
                ->on('estudiantesempresas')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->foreign(['idEmpresa', 'idEstudianteEvaluador'])
                ->references(['idEmpresa', 'idEstudiante'])
                ->on('estudiantesempresas')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->foreign('idCriterio')
                ->references('idCriterio')
                ->on('criterio')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('evaluacionPar');
    }
}
