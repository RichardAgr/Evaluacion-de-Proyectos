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
        Schema::table('sprint', function (Blueprint $table) {
            $table->foreign(['idPlanificacion'], 'FK_fk_Sprint_Planificacion')->references(['idPlanificacion'])->on('planificacion')->onUpdate('restrict')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sprint', function (Blueprint $table) {
            $table->dropForeign('FK_fk_Sprint_Planificacion');
        });
    }
};
