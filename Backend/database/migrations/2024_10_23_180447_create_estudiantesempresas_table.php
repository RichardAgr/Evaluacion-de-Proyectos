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
        Schema::create('estudiantesempresas', function (Blueprint $table) {
            $table->unsignedBigInteger('idEmpresa');
            $table->unsignedBigInteger('idEstudiante');

            $table->primary(['idEmpresa', 'idEstudiante']);

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
        Schema::dropIfExists('estudiantesempresas');
    }
};
