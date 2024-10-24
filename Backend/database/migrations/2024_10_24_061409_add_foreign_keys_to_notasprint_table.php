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
        Schema::table('notasprint', function (Blueprint $table) {
            $table->foreign(['idSprint'], 'fk_estudiantesempresas_has_sprint_sprint1')->references(['idSprint'])->on('sprint')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['idEmpresa', 'idEstudiante'], 'fk_notasprint_estudiantesempresas1')->references(['idEmpresa', 'idEstudiante'])->on('estudiantesempresas')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('notasprint', function (Blueprint $table) {
            $table->dropForeign('fk_estudiantesempresas_has_sprint_sprint1');
            $table->dropForeign('fk_notasprint_estudiantesempresas1');
        });
    }
};
