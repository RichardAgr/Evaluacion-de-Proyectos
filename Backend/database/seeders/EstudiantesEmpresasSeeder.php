<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EstudiantesEmpresasSeeder extends Seeder
{
    public function run()
    {
        DB::table('estudiantesempresas')->insert([
            ['idEmpresa' => 1, 'idEstudiante' => 1],
            ['idEmpresa' => 1, 'idEstudiante' => 2],
            // Agrega el resto de los registros aquí...
            ['idEmpresa' => 6, 'idEstudiante' => 27],
        ]);
    }
}
