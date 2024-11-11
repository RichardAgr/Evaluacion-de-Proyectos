<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCriteriosEvaluacionAparTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('criteriosEvaluacionAPar', function (Blueprint $table) {
            $table->unsignedBigInteger('idCriterio');
            $table->string('criterio', 45)->nullable();
            $table->unsignedBigInteger('idGrupo');

            // ! QUE SIGNIFICA ESTO????????
            $table->string('tipoCriterio', 45)->nullable();
            
            // CADA CRITERIO DEBERIA TENER SU NOTA O PARAMETRO DE EVALUACION
            //$table->integer('nota')->nullable()->default(null);

            $table->primary(['idCriterio', 'idGrupo']);

            // * Llave foranea idGrupo
            $table->foreign('idGrupo')
                  ->references('idGrupo')
                  ->on('grupo')
                  ->onDelete('no action')
                  ->onUpdate('no action');

            $table->index('idGrupo');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('criterios_evaluacion_apar');
    }
}