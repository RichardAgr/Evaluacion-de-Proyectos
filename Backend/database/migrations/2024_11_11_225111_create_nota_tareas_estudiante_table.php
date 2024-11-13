<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNotaTareasEstudianteTable extends Migration
{
    public function up()
    {
        Schema::create('notaTareasEstudiante', function (Blueprint $table) {
            $table->unsignedBigInteger('estudiante_idEstudiante');
            $table->unsignedBigInteger('sprint_idSprint');
            $table->string('comentario', 200);
            
            // Llave primaria compuesta
            $table->primary(['estudiante_idEstudiante', 'sprint_idSprint']);
            
            // Relaciones
            $table->foreign('estudiante_idEstudiante')->references('idEstudiante')->on('estudiante')->onDelete('cascade');
            $table->foreign('sprint_idSprint')->references('idSprint')->on('sprint')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('notaTareasEstudiante');
    }
}
