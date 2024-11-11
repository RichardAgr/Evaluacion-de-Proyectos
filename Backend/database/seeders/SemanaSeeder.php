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

            $semanaIni = $fechaIni->copy();

            for ($i = 1; $i <= $numeroSemanas; $i++) {
                $semanaFin = $semanaIni->copy()->addDays(6);

                // Asegurarse de que la fecha final de la semana no exceda la fecha final del sprint
                if ($semanaFin->gt($fechaFin)) {
                    $semanaFin = $fechaFin->copy();
                }

                DB::table('semana')->insert([
                    'idSprint' => $sprint->idSprint,
                    'numeroSemana' => $i,
                    'fechaIni' => $semanaIni->toDateString(),
                    'fechaFin' => $semanaFin->toDateString(),
                ]);

                // Preparar la fecha de inicio para la siguiente semana
                $semanaIni = $semanaFin->addDay();

                // Si la fecha de inicio de la siguiente semana excede la fecha final del sprint, terminar el bucle
                if ($semanaIni->gt($fechaFin)) {
                    break;
                }
            }
        }
    }
}