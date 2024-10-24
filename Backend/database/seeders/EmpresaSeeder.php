<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EmpresaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('empresa')->insert([
            [
                'idEmpresa' => 1,
                'nombreEmpresa' => 'Creative Harbor',
                'nombreLargo' => 'Creative Harbor Innovations S.R.L',
                'numerodefaltasempresa' => 0,
                'notaproductofinal' => null,
            ],
            [
                'idEmpresa' => 2,
                'nombreEmpresa' => 'SoftCraft',
                'nombreLargo' => 'SoftCraft Technology S.R.L.',
                'numerodefaltasempresa' => 0,
                'notaproductofinal' => 0,
            ],
            [
                'idEmpresa' => 3,
                'nombreEmpresa' => 'BlueWave',
                'nombreLargo' => 'BlueWave Software Development S.R.L.',
                'numerodefaltasempresa' => 0,
                'notaproductofinal' => 0,
            ],
            [
                'idEmpresa' => 4,
                'nombreEmpresa' => 'LogicTree',
                'nombreLargo' => 'LogicTree Digital Systems S.A.',
                'numerodefaltasempresa' => 0,
                'notaproductofinal' => 0,
            ],
            [
                'idEmpresa' => 5,
                'nombreEmpresa' => 'PixelForge',
                'nombreLargo' => 'PixelForge Software Development S.R.L.',
                'numerodefaltasempresa' => null,
                'notaproductofinal' => null,
            ]
        ]);
    }
}