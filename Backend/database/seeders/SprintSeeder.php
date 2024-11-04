<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class SprintSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $planificaciones = DB::table('planificacion')->pluck('idPlanificacion');

        foreach ($planificaciones as $idPlanificacion) {
            $startDate = Carbon::now()->addDays(rand(1, 30));
            
            for ($i = 1; $i <= 4; $i++) {
                DB::table('sprint')->insert([
                    'idPlanificacion' => $idPlanificacion,
                    'numeroSprint' => $i,
                    'fechaIni' => $startDate,
                    'fechaFin' => $startDate->copy()->addDays(14),
                    'cobro' => round(rand(0, 10000) / 100, 2),
                    'fechaEntrega' => $startDate->copy()->addDays(15),
                ]);

                $startDate->addDays(15);
            }
        }
    }
}