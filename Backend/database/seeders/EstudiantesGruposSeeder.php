<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\DB;

class EstudiantesGruposSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $estudiantes = range(1, 24); 
        $grupo = 1;

        foreach ($estudiantes as $estudiante) {
            
            DB::table('estudiantesgrupos')->insert([
                'idGrupo' => $grupo,
                'idEstudiante' => $estudiante,
            ]);
        }
    }
}
