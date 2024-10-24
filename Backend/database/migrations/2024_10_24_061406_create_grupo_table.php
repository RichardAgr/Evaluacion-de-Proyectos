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
        Schema::create('grupo', function (Blueprint $table) {
            $table->integer('idGrupo', true)->unique('idgrupo');
            $table->integer('numGrupo')->nullable();
            $table->string('gestionGrupo', 6)->nullable();
            $table->integer('idDocente')->index('fk_fk_grupo_docente');
            $table->string('codigoAcceso', 20)->nullable();
            $table->longText('descripcion')->nullable();

            $table->primary(['idGrupo']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('grupo');
    }
};
