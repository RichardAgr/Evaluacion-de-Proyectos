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
            $table->id('idSemana');
            $table->unsignedBigInteger('idSprint');
            $table->tinyInteger('numeroSemana');

            // * Llave foranea idSprint
            $table->foreign('idSprint')
                ->references('idSprint')
                ->on('sprint')
                ->onDelete('cascade');

            $table->dateTime('fechaIni');
            $table->dateTime('fechaFin');
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
        Schema::dropIfExists('semana');
    }
};
