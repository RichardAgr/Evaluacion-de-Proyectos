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
        Schema::table('planificacion', function (Blueprint $table) {
            $table->foreign(['idEmpresa'], 'FK_fk_Planificacion_Empresa')->references(['idEmpresa'])->on('empresa')->onUpdate('restrict')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('planificacion', function (Blueprint $table) {
            $table->dropForeign('FK_fk_Planificacion_Empresa');
        });
    }
};
