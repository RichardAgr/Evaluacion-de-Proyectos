<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class NotaSprintSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $sprints = DB::table('sprint')->get();
        $estudiantes = DB::table('estudiantesempresas')->get();

        $comentarios = [
            "Excelente trabajo, superó las expectativas.",
            "Buen desempeño, cumplió con todos los objetivos.",
            "Desempeño satisfactorio, pero hay áreas de mejora.",
            "Necesita mejorar en varios aspectos.",
            "No cumplió con los objetivos esperados.",
            "Mostró gran iniciativa y liderazgo.",
            "Colaboró efectivamente con el equipo.",
            "Demostró habilidades técnicas sobresalientes.",
            "Mejoró significativamente desde la última evaluación.",
            "Necesita trabajar en su comunicación con el equipo.",
        ];

        foreach ($sprints as $sprint) {
            foreach ($estudiantes as $estudiante) {
                $nota = rand(1, 100); // nota random del 1 al 100
                $comentario = $comentarios[array_rand($comentarios)];

                DB::table('notaSprint')->insert([
                    'idSprint' => $sprint->idSprint,
                    'idEstudiante' => $estudiante->idEstudiante,
                    'idEmpresa' => $estudiante->idEmpresa,
                    'nota' => $nota,
                    'comentario' => $comentario,
                ]);
            }
        }
    }
}