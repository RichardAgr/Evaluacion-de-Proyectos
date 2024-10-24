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
        Schema::create('sprint', function (Blueprint $table) {
            $table->integer('idSprint', true)->unique('idsprint');
            $table->integer('idPlanificacion')->index('fk_fk_sprint_planificacion');
            $table->date('fechaIni')->nullable();
            $table->date('fechaFin')->nullable();
            $table->integer('cobro')->nullable();
            $table->date('fechaEntrega')->nullable();
            $table->tinyText('entregables')->nullable();
            $table->text('comentariodocente')->nullable();
            $table->integer('numSprint')->nullable();

            $table->primary(['idSprint']);
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
