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
        Schema::create('docente', function (Blueprint $table) {
            $table->integer('idDocente', true)->unique('iddocente');
            $table->string('nombreCuenta', 15)->nullable()->unique('nombrecuenta');
            $table->string('nombreDocente', 10)->nullable();
            $table->string('primerApellido', 10)->nullable();
            $table->string('segundoApellido', 10)->nullable();
            $table->string('contrasena', 20)->nullable();

            $table->primary(['idDocente']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('docente');
    }
};
