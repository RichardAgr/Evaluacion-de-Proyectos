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
            $table->integer('idEmpresa');
            $table->integer('idEstudiante')->index('fk_relationship_14');

            $table->primary(['idEmpresa', 'idEstudiante']);
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
