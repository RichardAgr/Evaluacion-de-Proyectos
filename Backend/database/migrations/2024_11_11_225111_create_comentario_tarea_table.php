<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateComentarioTareaTable extends Migration
{
    public function up()
    {
        Schema::create('comentarioTarea', function (Blueprint $table) {
            $table->unsignedBigInteger('estudiante_idEstudiante');
            $table->unsignedBigInteger('semana_idSemana');
            $table->string('comentario', 200);
            
            // Llave primaria compuesta
            $table->primary(['estudiante_idEstudiante', 'semana_idSemana']);
            
            // Relaciones
            $table->foreign('estudiante_idEstudiante')->references('idEstudiante')->on('estudiante')->onDelete('cascade');
            $table->foreign('semana_idSemana')->references('idSemana')->on('semana')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('comentarioTarea');
    }
}
