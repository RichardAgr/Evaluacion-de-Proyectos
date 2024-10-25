<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DocenteSeeder extends Seeder
{
    public function run()
    {
        DB::table('docente')->insert([
            ['idDocente' => 1, 'nombreCuenta' => 'letiGod', 'nombreDocente' => 'Leticia', 'primerApellido' => 'Blanco', 'segundoApellido' => 'Coca', 'contrasena' => 'password1'],
            ['idDocente' => 2, 'nombreCuenta' => 'corina123', 'nombreDocente' => 'Carlos', 'primerApellido' => 'Flores', 'segundoApellido' => 'Villaroel', 'contrasena' => 'password2'],
        ]);
    }
}
