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
        Schema::table('tarea', function (Blueprint $table) {
            $table->foreign(['idSemana'], 'FK_fk_Tarea_Semana')->references(['idSemana'])->on('semana')->onUpdate('restrict')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tarea', function (Blueprint $table) {
            $table->dropForeign('FK_fk_Tarea_Semana');
        });
    }
};
