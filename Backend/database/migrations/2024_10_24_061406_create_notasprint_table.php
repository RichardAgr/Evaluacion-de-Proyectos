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
        Schema::create('notasprint', function (Blueprint $table) {
            $table->integer('idSprint')->index('fk_estudiantesempresas_has_sprint_sprint1_idx');
            $table->integer('nota');
            $table->text('comentarioDocente')->nullable();
            $table->integer('idEmpresa');
            $table->integer('idEstudiante');

            $table->index(['idEmpresa', 'idEstudiante'], 'fk_notasprint_estudiantesempresas1_idx');
            $table->primary(['idSprint', 'idEmpresa', 'idEstudiante']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notasprint');
    }
};
