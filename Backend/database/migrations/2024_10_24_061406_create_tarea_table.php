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
        Schema::create('tarea', function (Blueprint $table) {
            $table->integer('idTarea', true)->unique('idtarea');
            $table->integer('idSemana')->index('fk_fk_tarea_semana');
            $table->tinyText('comentario');
            $table->tinyText('textoTarea');
            $table->dateTime('fechaEntrega');

            $table->primary(['idTarea']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tarea');
    }
};
