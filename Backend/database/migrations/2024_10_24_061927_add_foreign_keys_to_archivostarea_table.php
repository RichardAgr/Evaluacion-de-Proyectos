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
        Schema::table('archivostarea', function (Blueprint $table) {
            $table->foreign(['idTarea'], 'FK_fk_ArchivosTarea_Tarea')->references(['idTarea'])->on('tarea')->onUpdate('restrict')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('archivostarea', function (Blueprint $table) {
            $table->dropForeign('FK_fk_ArchivosTarea_Tarea');
        });
    }
};
