<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSprintTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sprint', function (Blueprint $table) {
            $table->id('idSprint');
            $table->unsignedBigInteger('idPlanificacion');
            $table->date('fechaIni')->nullable();
            $table->date('fechaFin')->nullable();
            $table->integer('cobro')->nullable();
            $table->date('fechaEntrega')->nullable();
            $table->string('entregables', 255)->nullable(); // ! hay que añadir una tabla de entregables con id del Sprint
            //$table->tinyInteger('notasprint')->nullable();  // ! ya no hay nota Sprint
            //$table->text('comentariodocente')->nullable();  // ! ya no hay comentario docente para cada Sprint

            $table->charset = 'utf8mb4';
            $table->collation = 'utf8mb4_unicode_ci';
            $table->engine = 'InnoDB';
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sprint');
    }
};
