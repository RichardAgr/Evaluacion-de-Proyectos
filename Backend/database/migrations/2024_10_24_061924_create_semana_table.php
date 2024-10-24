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
        Schema::create('semana', function (Blueprint $table) {
            $table->integer('idSemana', true)->unique('idsemana');
            $table->integer('idSprint')->index('fk_fk_semana_sprint');

            $table->primary(['idSemana']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('semana');
    }
};
