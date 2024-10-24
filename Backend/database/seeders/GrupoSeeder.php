<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GrupoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('grupo')->insert([
            [
                'idGrupo' => 1,
                'numGrupo' => 1,
                'gestionGrupo' => '2024-2',
                'idDocente' => 1,
                'codigoAcceso' => 'hamilton',
                'descripcion' => 'descripcion de leticia desde la base',
            ],
            [
                'idGrupo' => 2,
                'numGrupo' => 2,
                'gestionGrupo' => '2024-2',
                'idDocente' => 2,
                'codigoAcceso' => 'hamilton2',
                'descripcion' => 'descripcion de grupo2',
            ],
            [
                'idGrupo' => 3,
                'numGrupo' => 2,
                'gestionGrupo' => '2023-2',
                'idDocente' => 2,
                'codigoAcceso' => 'hamilton2',
                'descripcion' =>  'descripcion de grupo3 de Taller de ingenieria de software con docente 2',
            ],
        ]);
    }
}