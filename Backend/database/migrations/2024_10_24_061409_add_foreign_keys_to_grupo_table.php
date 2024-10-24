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
        Schema::table('grupo', function (Blueprint $table) {
            $table->foreign(['idDocente'], 'FK_fk_Grupo_Docente')->references(['idDocente'])->on('docente')->onUpdate('restrict')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('grupo', function (Blueprint $table) {
            $table->dropForeign('FK_fk_Grupo_Docente');
        });
    }
};
