<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EmpresaSeeder extends Seeder
{
    public function run()
    {
        DB::table('empresa')->insert([
            ['idEmpresa' => 1, 'nombreEmpresa' => 'Creative', 'nombreLargo' => 'Creative S.R.L', 'numerodefaltasempresa' => 0, 'notaproductofinal' => null],
            ['idEmpresa' => 2, 'nombreEmpresa' => 'Harbor', 'nombreLargo' => 'Harbor S.R.L.', 'numerodefaltasempresa' => 0, 'notaproductofinal' => 0],
            ['idEmpresa' => 3, 'nombreEmpresa' => 'SOFT', 'nombreLargo' => 'SOFT S.R.L.', 'numerodefaltasempresa' => 0, 'notaproductofinal' => 0],
            ['idEmpresa' => 4, 'nombreEmpresa' => 'PruebaSoft', 'nombreLargo' => 'PruebaTisSoft Ltda.', 'numerodefaltasempresa' => 0, 'notaproductofinal' => 0],
            ['idEmpresa' => 5, 'nombreEmpresa' => 'Tecnología Inova', 'nombreLargo' => 'Tecnología Innovadora S.A.', 'numerodefaltasempresa' => null, 'notaproductofinal' => null],
            ['idEmpresa' => 6, 'nombreEmpresa' => 'front', 'nombreLargo' => 'desde front', 'numerodefaltasempresa' => null, 'notaproductofinal' => null],
        ]);
    }
}
