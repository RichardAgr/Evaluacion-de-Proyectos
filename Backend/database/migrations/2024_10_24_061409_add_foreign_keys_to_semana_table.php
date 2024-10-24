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
        Schema::table('semana', function (Blueprint $table) {
            $table->foreign(['idSprint'], 'FK_fk_Semana_Sprint')->references(['idSprint'])->on('sprint')->onUpdate('restrict')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('semana', function (Blueprint $table) {
            $table->dropForeign('FK_fk_Semana_Sprint');
        });
    }
};
