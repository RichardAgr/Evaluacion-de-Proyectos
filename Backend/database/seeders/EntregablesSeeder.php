<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EntregablesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $sprints = DB::table('sprint')->get();

        $entregablesPosibles = [
            'Diseño de interfaz de usuario',
            'Implementación de autenticación',
            'Desarrollo de API RESTful',
            'Integración con base de datos',
            'Implementación de funcionalidad de búsqueda',
            'Optimización de rendimiento',
            'Implementación de pruebas unitarias',
            'Desarrollo de panel de administración',
            'Integración de pasarela de pagos',
            'Implementación de notificaciones en tiempo real',
            'Desarrollo de funcionalidad de exportación de datos',
            'Implementación de sistema de caché',
            'Desarrollo de funcionalidad de filtrado avanzado',
            'Implementación de sistema de roles y permisos',
            'Desarrollo de funcionalidad de generación de informes',
            'Implementación de sistema de logging y monitoreo',
            'Desarrollo de funcionalidad de importación de datos',
            'Implementación de sistema de backups automáticos',
            'Desarrollo de API para integración con servicios externos',
            'Implementación de sistema de versionado de contenido'
        ];

        foreach ($sprints as $sprint) {
            $numEntregables = rand(2, 5);  // numero de entregables random
            $entregablesSeleccionados = array_rand($entregablesPosibles, $numEntregables);

            foreach ($entregablesSeleccionados as $entregable) {
                DB::table('entregables')->insert([
                    'idSprint' => $sprint->idSprint,
                    'descripcionEntregable' => $entregablesPosibles[$entregable]
                ]);
            }
        }
    }
}