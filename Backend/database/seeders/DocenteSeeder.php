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
                'password' => Hash::make('password1'),
                'email' => 'pruebaemailleti@gmail.com'
            ],
            [
                'idDocente' => 2,
                'nombreCuenta' => 'corina123',
                'nombreDocente' => 'Carlos',
                'primerApellido' => 'Flores',
                'segundoApellido' => 'Villaroel',
                'password' => Hash::make('password2'),
                'email' => 'pruebaemail@gmail.com'
            ],
        ]);
    }
}
