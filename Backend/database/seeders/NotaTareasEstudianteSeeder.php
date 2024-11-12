<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\NotaTareasEstudiante;
use App\Models\Estudiante;
use App\Models\Sprint;

class NotaTareasEstudianteSeeder extends Seeder
{
    public function run()
    {
        // Crea datos de prueba para 10 estudiantes y 10 sprints
        $estudiantes = Estudiante::all();
        $sprints = Sprint::all();

        foreach ($estudiantes as $estudiante) {
            foreach ($sprints as $sprint) {
                NotaTareasEstudiante::create([
                    'estudiante_idEstudiante' => $estudiante->idEstudiante,
                    'sprint_idSprint' => $sprint->idSprint,
                    'comentario' => 'Comentario de prueba para ' . $estudiante->nombreEstudiante,
                ]);
            }
        }
    }
}
