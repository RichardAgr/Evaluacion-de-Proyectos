<?php

namespace App\Http\Controllers\Estudiante;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\JsonResponse;
use App\Models\Tarea;
use App\Models\Estudiante;
use App\Models\ArchivoTarea;
use App\Models\TareaEstudiante;
use App\Models\Semana;
use App\Models\Sprint;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Carbon;
use App\Models\Empresa;
use App\Models\Planificacion;
class TareaController extends Controller
{
    public function obtenerTarea($idTarea)
    {
        // Obtener la tarea
        $tarea = Tarea::find($idTarea);

        if (!$tarea) {
            return response()->json(['error' => 'Tarea no encontrada'], 404);
        }

        // Obtener los estudiantes de la tarea
        $estudiantes = DB::table('estudiante')
            ->join('tareasestudiantes', 'tareasestudiantes.idEstudiante', '=', 'estudiante.idEstudiante')
            ->select('estudiante.idEstudiante', 'nombreEstudiante', 'primerApellido', 'segundoApellido')
            ->where('tareasestudiantes.idTarea', $idTarea)
            ->get();

        // Obtener el primer estudiante relacionado con la tarea (esto sería uno de los estudiantes que ya se ha recuperado)
        $primerEstudiante = $estudiantes->first();

        if ($primerEstudiante) {
            // Obtener las empresas del primer estudiante
            $empresasEstudiante = DB::table('estudiantesempresas')
                ->where('idEstudiante', $primerEstudiante->idEstudiante)
                ->pluck('idEmpresa');

            // Obtener todos los estudiantes de las mismas empresas
            $companerosDeEmpresa = DB::table('estudiante')
                ->join('estudiantesempresas', 'estudiantesempresas.idEstudiante', '=', 'estudiante.idEstudiante')
                ->whereIn('estudiantesempresas.idEmpresa', $empresasEstudiante)
                ->where('estudiante.idEstudiante', '!=', $primerEstudiante->idEstudiante) // Excluir al primer estudiante
                ->select('estudiante.idEstudiante', 'nombreEstudiante', 'primerApellido', 'segundoApellido')
                ->get();
        }

        // Formar la respuesta
        $respuesta = [
            'idSemana' => $tarea->idSemana,
            'nombreTarea' => $tarea->nombreTarea,
            'comentario' => $tarea->comentario,
            'textotarea' => $tarea->textoTarea,
            'fechentregado' => $tarea->fechaEntrega,
            'estudiantes' => $estudiantes,
            'integrantes' => $companerosDeEmpresa ?? [],
        ];

        return response()->json($respuesta);
    }


    //************************************ POSTS*************************** */
    public function store(Request $request)
    {
        // Validar la entrada
        $request->validate([
            'idSemana' => 'required|integer',
            'textotarea' => 'required|string',
            'fechentregado' => 'required|date',
            'archivotarea' => 'nullable|array',
            'archivotarea.*' => 'file|mimes:pdf,zip,rar,7z', // Archivos permitidos
        ]);

        // Crear la tarea
        $tarea = Tarea::create([
            'idSemana' => $request->idSemana,
            'comentario' => '',
            'textoTarea' => $request->textotarea,
            'fechaEntrega' => $request->fechentregado,
            'notaTarea' => 0,
        ]);

        // Guardar los archivos en el disco y en la base de datos
        $archivosGuardados = [];
        if ($request->hasFile('archivotarea')) {
            foreach ($request->file('archivotarea') as $archivo) {
                $nombreArchivo = $archivo->getClientOriginalName();
                $rutaArchivo = $archivo->storeAs("public/uploads/{$tarea->idTarea}", $nombreArchivo);

                $archivoTarea = ArchivoTarea::create([
                    'idTarea' => $tarea->idTarea,
                    'archivo' => $rutaArchivo,
                    'nombreArchivo' => $nombreArchivo,
                    'fechaEntrega' => $request->fechentregado,
                ]);

                $archivosGuardados[] = $archivoTarea;
            }
        }

        return response()->json([
            'tarea' => $tarea,
            'archivos' => $archivosGuardados,
        ], 201);
    }

    public function update(Request $request, $idTarea)
    {
        try {
            // Validar los datos de entrada
            $request->validate([
                'textotarea' => 'required|string',
                'responsables' => 'nullable|array',
            ]);

            // Buscar la tarea
            $tarea = Tarea::find($idTarea);
            if (!$tarea) {
                return response()->json(['error' => 'Tarea no encontrada'], 404);
            }

            // Actualizar la descripción de la tarea
            $tarea->textoTarea = $request->input('textotarea');
            $tarea->save();


            // Eliminar responsables actuales de la tarea
            TareaEstudiante::where('idTarea', $idTarea)->delete();

            // Agregar responsables
            if ($request->has('responsables')) {
                foreach ($request->input('responsables') as $responsable) {
                    TareaEstudiante::create([
                        'idTarea' => $idTarea,
                        'idEstudiante' => $responsable['idEstudiante'],
                    ]);
                }
            }

            return response()->json(['message' => 'Tarea actualizada correctamente'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function crearTarea(Request $request)
    {
        $sprint = $request->input('sprint');
        $semana = $request->input('semana');
        $nombreTarea = $request->input('nombreTarea');

        $resultado = DB::table('tarea as t');
        // ->join('semana as s','s.idSemana',)
    }

    public function getTareasSemana($idEmpresa, $idSemana)
    {
        try {
            // Realizar una consulta uniendo las tablas necesarias para obtener las tareas
            $tareas = Tarea::join('semana as s', 'tarea.idSemana', '=', 's.idSemana')
                ->join('planificacion as p', 's.idPlanificacion', '=', 'p.idPlanificacion')
                ->join('empresa as emp', 'emp.idEmpresa', '=', 'p.idEmpresa')
                ->where('emp.idEmpresa', $idEmpresa)  // Filtrar por idEmpresa
                ->where('s.idSemana', $idSemana)  // Filtrar por idSemana
                ->select('tarea.*', 's.numeroSemana', 's.fechaIni', 's.fechaFin')
                ->get();

            // Retornar la respuesta con las tareas encontradas
            return response()->json([
                'idSemana' => $idSemana,
                'numeroSemana' => $tareas->isNotEmpty() ? $tareas->first()->numeroSemana : -1,
                'fechaIni' => $tareas->isNotEmpty() ? $tareas->first()->fechaIni : null,
                'fechaFin' => $tareas->isNotEmpty() ? $tareas->first()->fechaFin : null,
                'tareas' => $tareas,
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al obtener las tareas: ' . $e->getMessage()], 500);
        }
    }

    

    // Actualizar las tareas de una semana específica
    public function createOrUpdateTareas(Request $request)
    {
        // Validar la solicitud
        $validated = $request->validate([
            'numeroSemana' => 'required|integer',
            'numeroSprint' => 'required|integer',
            'empresaID' => 'required|integer',
            'tareas' => 'required|array',
            'tareas.*.idTarea' => 'nullable|integer', // Permitir nulo para nuevas tareas
            'tareas.*.nombreTarea' => 'required|string',
            'tareas.*.textoTarea' => 'nullable|string',
            'tareas.*.fechaEntrega' => 'nullable|date',
        ]);
    
        DB::beginTransaction();
    
        try {
            // Verificar si la empresa existe
            $empresa = Empresa::find($validated['empresaID']);
            if (!$empresa) {
                throw new \Exception('Empresa no encontrada.');
            }
    
            // Insertar o actualizar en la tabla 'planificacion'
            $planificacion = Planificacion::find($validated['empresaID']);
    
            // Insertar o actualizar en la tabla 'sprint'
            $sprint = Sprint::updateOrCreate(
                ['numeroSprint' => $validated['numeroSprint'], 'idPlanificacion' => $planificacion->idPlanificacion],
                [
                    'numeroSprint' => $validated['numeroSprint'],
                    'fechaInicio' => now(), // Asignar fecha actual como ejemplo
                    'fechaFin' => now()->addWeeks(2), // Ejemplo: 2 semanas después
                ]
            );
    
            // Insertar o actualizar en la tabla 'semana'
            $semana = Semana::updateOrCreate(
                ['numeroSemana' => $validated['numeroSemana'], 'idPlanificacion' => $planificacion->idPlanificacion],
                [
                    'numeroSemana' => $validated['numeroSemana'],
                    'fechaInicio' => now()->startOfWeek(),
                    'fechaFin' => now()->endOfWeek(),
                ]
            );
    
            // Insertar o actualizar en la tabla 'tarea'
            foreach ($validated['tareas'] as $tareaData) {
                Tarea::updateOrCreate(
                    [
                        'idTarea' => $tareaData['idTarea'] ?? null, // Permitir creación de nuevas tareas
                        'idSemana' => $semana->idSemana,
                    ],
                    [
                        'nombreTarea' => $tareaData['nombreTarea'],
                        'textoTarea' => $tareaData['textoTarea'] ?? null,
                        'fechaEntrega' => $tareaData['fechaEntrega'] ?? null,
                    ]
                );
            }
    
            DB::commit();
    
            return response()->json(['message' => 'Datos insertados o actualizados exitosamente'], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

public function deleteTareas(Request $request)
{
    // Validar la solicitud
    $validated = $request->validate([
        'tareas' => 'required|array',
        'tareas.*.idTarea' => 'required|integer', // Los IDs de las tareas son obligatorios
        'numeroSemana' => 'required|integer',
        'numeroSprint' => 'required|integer',
        'idEmpresa' => 'required|integer',
    ]);

    DB::beginTransaction();

    try {
        // Verificar si la empresa existe
        $empresa = Empresa::find($validated['idEmpresa']);
        if (!$empresa) {
            throw new \Exception('Empresa no encontrada.');
        }

        // Buscar la planificación relacionada
        $planificacion = Planificacion::where('idEmpresa', $empresa->idEmpresa)->first();
        if (!$planificacion) {
            throw new \Exception('No se encontró una planificación asociada a la empresa.');
        }

        // Buscar el sprint relacionado
        $sprint = Sprint::where('numeroSprint', $validated['numeroSprint'])
                        ->where('idPlanificacion', $planificacion->idPlanificacion)
                        ->first();
        if (!$sprint) {
            throw new \Exception('No se encontró un sprint asociado a la planificación.');
        }

        // Buscar la semana relacionada
        $semana = Semana::where('numeroSemana', $validated['numeroSemana'])
                        ->where('idSprint', $sprint->idSprint)
                        ->first();
        if (!$semana) {
            throw new \Exception('No se encontró una semana asociada al sprint.');
        }

        // Eliminar tareas especificadas en el array
        foreach ($validated['tareas'] as $tareaData) {
            $tarea = Tarea::where('idTarea', $tareaData['idTarea'])
                          ->where('idSemana', $semana->idSemana)
                          ->first();
            if (!$tarea) {
                throw new \Exception("La tarea con ID {$tareaData['idTarea']} no se encontró en la semana especificada.");
            }
            $tarea->delete();
        }

        // Verificar si se deben eliminar semanas, sprints o planificación huérfanos
        if (Tarea::where('idSemana', $semana->idSemana)->count() === 0) {
            $semana->delete();
        }

        if (Semana::where('idSprint', $sprint->idSprint)->count() === 0) {
            $sprint->delete();
        }

        if (Sprint::where('idPlanificacion', $planificacion->idPlanificacion)->count() === 0) {
            $planificacion->delete();
        }

        DB::commit();

        return response()->json(['message' => 'Tareas eliminadas exitosamente'], 200);

    } catch (\Exception $e) {
        DB::rollBack();
        return response()->json(['error' => $e->getMessage()], 400);
    }
}


}
