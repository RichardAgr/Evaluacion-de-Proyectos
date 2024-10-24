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
        Schema::create('estudiante', function (Blueprint $table) {
            $table->integer('idEstudiante', true)->unique('idestudiante');
            $table->string('nombreCuenta', 15)->nullable()->unique('nombrecuenta');
            $table->string('nombreEstudiante', 12)->nullable();
            $table->string('primerApellido', 10)->nullable();
            $table->string('segundoApellido', 10)->nullable();
            $table->string('contrasena', 20)->nullable();
            $table->tinyInteger('numerodefaltasest')->nullable();
            $table->boolean('disponible')->nullable();

            $table->primary(['idEstudiante']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('estudiante');
    }
};
