<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ComentarioTarea;
use App\Models\Empresa;
use App\Models\Planificacion;
use App\Models\Sprint;
use App\Models\Semana;
use App\Models\EstudiantesEmpresas;
use App\Models\TareaEstudiante;
use Illuminate\Support\Facades\Log;

class ComentarioTareaSeeder extends Seeder
{
    public function run()
    {
        Log::info('Iniciando ComentarioTareaSeeder');

        try {
            // Obtener la planificación de id 1
            $planificacion = Planificacion::findOrFail(1);
            Log::info('Planificación encontrada', ['id' => $planificacion->idPlanificacion]);

            // Obtener todos los sprints de la planificación
            $sprints = $planificacion->sprints;
            Log::info('Sprints encontrados', ['count' => $sprints->count()]);

            // Obtener la empresa de la planificación
            $empresa = $planificacion->empresa;
            Log::info('Empresa encontrada', ['id' => $empresa->idEmpresa]);

            // Obtener todas las semanas de todos los sprints
            $semanas = $sprints->flatMap(function ($sprint) {
                return $sprint->semanas;
            });
            Log::info('Semanas encontradas', ['count' => $semanas->count()]);

            // Obtener todos los estudiantes asociados a la empresa
            $estudiantes = EstudiantesEmpresas::where('idEmpresa', $empresa->idEmpresa)->get();
            Log::info('Estudiantes encontrados', ['count' => $estudiantes->count()]);

            $comentariosCreados = 0;

            foreach ($estudiantes as $estudiante) {
                foreach ($semanas as $semana) {
                    // Verificar si el estudiante tiene alguna tarea asignada en esta semana
                    $tieneTarea = TareaEstudiante::whereHas('tareas', function ($query) use ($semana) {
                        $query->where('idSemana', $semana->idSemana);
                    })->where('idEstudiante', $estudiante->idEstudiante)->exists();

                    if ($tieneTarea) {
                        ComentarioTarea::create([
                            'idEstudiante' => $estudiante->idEstudiante,
                            'idSemana' => $semana->idSemana,
                            'comentario' => $this->generateRandomComment(),
                        ]);
                        $comentariosCreados++;
                    }
                }
            }

            Log::info('Comentarios creados', ['count' => $comentariosCreados]);
        } catch (\Exception $e) {
            Log::error('Error en ComentarioTareaSeeder', ['error' => $e->getMessage()]);
            throw $e;
        }
    }

    /**
     * Generate a random comment.
     *
     * @return string
     */
    private function generateRandomComment(): string
    {
        $comments = [
            "Demostró habilidades sólidas al implementar funcionalidades clave.",
            "El manejo de los tiempos en la resolución de tareas fue deficiente.",
            "Se evidenció una buena comprensión de los conceptos de programación aplicados.",
            "Hubo dificultades al depurar errores en el código, lo que retrasó el avance.",
            "Excelente iniciativa al investigar soluciones por cuenta propia.",
            "Falta de consistencia en la calidad del código presentado.",
            "Integró correctamente módulos complejos con resultados funcionales.",
            "No cumplió con algunos requisitos fundamentales establecidos para esta semana.",
            "El trabajo en equipo fue destacable, con aportaciones significativas al proyecto.",
            "Se observó poca atención a los detalles en la documentación del proyecto."
        ];

        return $comments[array_rand($comments)];
    }
}
