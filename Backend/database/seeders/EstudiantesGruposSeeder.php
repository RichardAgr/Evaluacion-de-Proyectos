<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EstudiantesGruposSeeder extends Seeder
{
    public function run()
    {
        DB::table('estudiantesgrupos')->insert([
            ['idEstudiante' => 1, 'idGrupo' => 1],
            ['idEstudiante' => 1, 'idGrupo' => 3],
            // Agrega el resto de los registros aquí...
            ['idEstudiante' => 27, 'idGrupo' => 1],
        ]);
    }
}
