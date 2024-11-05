<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EstudiantesEmpresasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $estudiantes = range(1, 24);
        $empresas = [1, 2, 3, 4, 5];
        $numEmpresas = count($empresas);
        $numEmpresas = count($empresas);
        $estudiantesPorEmpresa = ceil(count($estudiantes) / $numEmpresas);

        // Shuffle the students to ensure random distribution
        shuffle($estudiantes);

        $asignaciones = [];

        foreach ($estudiantes as $index => $estudiante) {
            $empresaIndex = floor($index / $estudiantesPorEmpresa);
            $empresa = $empresas[$empresaIndex % $numEmpresas];

            $asignaciones[] = [
                'idEmpresa' => $empresa,
                'idEstudiante' => $estudiante,
            ];
        }

        // Shuffle the assignments to ensure randomness in the order of insertion
        shuffle($asignaciones);

        // Insert all assignments in a single query for better performance
        DB::table('estudiantesempresas')->insert($asignaciones);
    }
}