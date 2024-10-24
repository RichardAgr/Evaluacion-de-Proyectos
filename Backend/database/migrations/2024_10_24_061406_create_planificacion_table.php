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
        Schema::create('planificacion', function (Blueprint $table) {
            $table->integer('idPlanificacion', true)->unique('idplanificacion');
            $table->integer('idEmpresa')->index('fk_fk_planificacion_empresa');
            $table->boolean('aceptada')->nullable();
            $table->dateTime('fechaEntrega');
            $table->text('comentariodocente')->nullable();
            $table->text('comentarioPrivado')->nullable();

            $table->primary(['idPlanificacion']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('planificacion');
    }
};
