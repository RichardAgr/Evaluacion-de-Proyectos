<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EstudianteSeeder extends Seeder
{
    public function run()
    {
        DB::table('estudiante')->insert([
            ['idEstudiante' => 1, 'nombreCuenta' => 'agarcia', 'nombreEstudiante' => 'Ana', 'primerApellido' => 'García', 'segundoApellido' => 'Sanchez', 'contrasena' => 'passAna1', 'numerodefaltasest' => null, 'disponible' => 0],
            // Agrega el resto de los registros aquí...
            ['idEstudiante' => 31, 'nombreCuenta' => 'p1', 'nombreEstudiante' => 'p1', 'primerApellido' => 'p1', 'segundoApellido' => 'p1', 'contrasena' => 'p1', 'numerodefaltasest' => null, 'disponible' => 0],
        ]);
    }
}
