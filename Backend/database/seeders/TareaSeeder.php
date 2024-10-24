<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class TareaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $semanas = DB::table('semana')->get();

        $tareas = [
            'Diseñar interfaz de usuario',
            'Implementar autenticación',
            'Crear base de datos',
            'Desarrollar API RESTful',
            'Realizar pruebas unitarias',
            'Optimizar rendimiento',
            'Documentar código',
            'Implementar funcionalidad de búsqueda',
            'Crear panel de administración',
            'Integrar pasarela de pagos'
        ];

        foreach ($semanas as $semana) {
            $numTareas = rand(2, 5); // Random number of tasks per week

            for ($i = 0; $i < $numTareas; $i++) {
                $tarea = $tareas[array_rand($tareas)];
                $fechaEntrega = Carbon::now()->addDays(rand(1, 7));

                DB::table('tarea')->insert([
                    'idSemana' => $semana->idSemana,
                    'textoTarea' => $tarea,
                    'comentario' => "Comentario para la tarea: $tarea",
                    'fechaEntrega' => $fechaEntrega,
                ]);
            }
        }
    }
}