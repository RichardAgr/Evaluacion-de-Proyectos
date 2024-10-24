<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateArchivostareasTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('archivostarea', function (Blueprint $table) {
            $table->id('idArchivo');
            $table->unsignedBigInteger('idTarea');
            $table->longText('archivo');
            $table->dateTime('fechaEntrega');
            $table->tinyText('nombreArchivo');


            // * Relacionamiento con Tarea FK idTarea
            $table->foreign('idTarea')
                  ->references('idTarea')
                  ->on('tarea')
                  ->onDelete('cascade');


            $table->charset = 'utf8mb4';
            $table->collation = 'utf8mb4_general_ci';
            $table->engine = 'InnoDB';
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('archivostarea');
    }
};
