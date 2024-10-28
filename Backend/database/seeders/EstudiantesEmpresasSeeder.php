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
 
        foreach ($estudiantes as $estudiante) {
            $empresa = $empresas[array_rand($empresas)];
            
            DB::table('estudiantesempresas')->insert([
                'idEmpresa' => $empresa,
                'idEstudiante' => $estudiante,
            ]);
        }
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> origin/jhair
