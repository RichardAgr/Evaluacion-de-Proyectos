<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class PlanificacionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $planificaciones = [
            [
                'idEmpresa' => 1,
                'aceptada' => false,
                'publicada' => false,
                'fechaEntrega' => Carbon::now()->addDays(30),
                'comentarioprivado' => 'Requiere una revisión completa',
                'comentariopublico' => 'Por favor, revisen y corrijan los puntos señalados',
            ],
            [
                'idEmpresa' => 2,
                'aceptada' => false,
                'publicada' => false,
                'fechaEntrega' => Carbon::now()->addDays(45),
                'comentarioprivado' => 'Necesita mejorar en varios aspectos',
                'comentariopublico' => 'Se requieren algunas correcciones',
            ],
            [
                'idEmpresa' => 3,
                'aceptada' => null,
                'publicada' => false,
                'fechaEntrega' => Carbon::now()->addDays(60),
                'comentarioprivado' => 'Pendiente de revisión',
                'comentariopublico' => null,
            ],
            [
                'idEmpresa' => 4,
                'aceptada' => true,
                'publicada' => false,
                'fechaEntrega' => Carbon::now()->addDays(20),
                'comentarioprivado' => 'Excelente planificación',
                'comentariopublico' => 'Felicitaciones por su trabajo',
            ],
            [
                'idEmpresa' => 5,
                'aceptada' => true,
                'publicada' => false,
                'fechaEntrega' => Carbon::now()->addDays(50),
                'comentarioprivado' => 'Comentario privado para la empresa 5',
                'comentariopublico' => 'Buen trabajo, sigan así',
            ],
        ];

        foreach ($planificaciones as $planificacion) {
            DB::table('planificacion')->insert($planificacion);
        }
    }
}