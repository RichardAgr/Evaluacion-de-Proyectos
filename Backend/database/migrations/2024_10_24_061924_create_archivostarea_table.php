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
        Schema::create('archivostarea', function (Blueprint $table) {
            $table->integer('idArchivo', true)->unique('idarchivo');
            $table->integer('idTarea')->index('fk_fk_archivostarea_tarea');
            $table->longText('archivo');
            $table->dateTime('fechaEntrega');
            $table->tinyText('nombreArchivo');

            $table->primary(['idArchivo']);
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
