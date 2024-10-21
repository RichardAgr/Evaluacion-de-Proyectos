<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmpresaTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('empresa', function (Blueprint $table) {
            $table->id('idEmpresa');
            $table->string('nombreEmpresa',24)->nullable();
            $table->string('nombreLargo',30)->nullable();
            $table->tinyInteger('numeroFaltasEmpresa')->nullable();
            $table->tinyInteger('notaProductoFinal')->nullable();
            $table->timestamps();
        });
    }

    /**
     * 
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('empresa');
    }
};
