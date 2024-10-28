<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DocenteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('docente')->insert([
            [
                'idDocente' => 1,
                'nombreCuenta' => 'letiGod',
                'nombreDocente' => 'Leticia',
                'primerApellido' => 'Blanco',
                'segundoApellido' => 'Coca',
                'contrasena' => bcrypt('password1'),
            ],
            [
                'idDocente' => 2,
                'nombreCuenta' => 'corina123',
                'nombreDocente' => 'Carlos',
                'primerApellido' => 'Flores',
                'segundoApellido' => 'Villaroel',
                'contrasena' => bcrypt('password2'),
            ],
        ]);
    }
}
