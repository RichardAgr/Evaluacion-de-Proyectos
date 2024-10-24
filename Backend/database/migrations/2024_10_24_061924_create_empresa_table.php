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
        Schema::create('empresa', function (Blueprint $table) {
            $table->integer('idEmpresa', true)->unique('idempresa');
            $table->string('nombreEmpresa', 24)->nullable()->unique('nombreempresa');
            $table->string('nombreLargo', 30)->nullable()->unique('nombrelargo');
            $table->tinyInteger('numerodefaltasempresa')->nullable();
            $table->tinyInteger('notaproductofinal')->nullable();

            $table->primary(['idEmpresa']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('empresa');
    }
};
