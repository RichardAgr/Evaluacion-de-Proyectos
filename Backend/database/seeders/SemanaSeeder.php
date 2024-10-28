<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class SemanaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $sprints = DB::table('sprint')->get();

        foreach ($sprints as $sprint) {
            $fechaIni = Carbon::parse($sprint->fechaIni);
            $fechaFin = Carbon::parse($sprint->fechaFin);
            
            $duracionEnDias = $fechaIni->diffInDays($fechaFin);
            $numeroSemanas = ceil($duracionEnDias / 7);

            for ($i = 1; $i <= $numeroSemanas; $i++) {
                DB::table('semana')->insert([
                    'idSprint' => $sprint->idSprint,
                    'numeroSemana' => $i,
                ]);
            }
        }
    }
}