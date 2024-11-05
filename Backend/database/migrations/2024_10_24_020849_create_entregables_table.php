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
        Schema::create('entregables', function (Blueprint $table) {
            $table->id('idEntregables');
            $table->unsignedBigInteger('idSprint');
            $table->text('descripcionEntregable');
            $table->string('archivoEntregable')->nullable()->default(null);
            // * Llave foranea idSprint
            $table->foreign('idSprint')
                ->references('idSprint')
                ->on('sprint')
                ->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('entregables');
    }
};
