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
        Schema::create('fotodocente', function (Blueprint $table) {
            $table->integer('idFoto', true)->unique('idfoto');
            $table->longText('foto');
            $table->integer('idDocente')->index('fk_fk_fotodocente_docente');

            $table->primary(['idFoto']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fotodocente');
    }
};
