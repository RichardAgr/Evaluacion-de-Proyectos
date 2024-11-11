<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEvaluacionParTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('evaluacionpar', function (Blueprint $table) {
            $table->unsignedBigInteger('idevaluacionPar');
            $table->unsignedBigInteger('idGrupo');
            $table->integer('nota');
            $table->string('idEstudianteEvaluado', 45);
            $table->string('idEstudianteEvaluador', 45);

            $table->primary(['idevaluacionPar', 'idGrupo']);

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
        Schema::dropIfExists('evaluacionpar');
    }
}