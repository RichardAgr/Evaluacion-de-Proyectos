<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\JsonResponse;
use App\Models\Tarea;
use App\Models\Estudiante;
use App\Models\ArchivoTarea;
use Illuminate\Support\Facades\Storage;

class TareaController extends Controller
{
    public function obtenerTarea($idTarea)
    {
        $tarea = Tarea::find($idTarea);

        if (!$tarea) {
            return response()->json(['error' => 'Tarea no encontrada'], 404);
        }

        // Obtener estudiantes de la tarea
        $estudiantes = DB::table('estudiante')
            ->join('tareasestudiantes', 'tareasestudiantes.idEstudiante', '=', 'estudiante.idEstudiante')
            ->join('fotoestudiante', 'fotoestudiante.idEstudiante', '=', 'estudiante.idEstudiante')
            ->select('estudiante.idEstudiante', 'nombreEstudiante', 'primerApellido', 'segundoApellido', 'fotoestudiante.foto')
            ->where('tareasestudiantes.idTarea', $idTarea)
            ->get();

        // Obtener archivos de la tarea
        $archivosTarea = ArchivoTarea::where('idTarea', $idTarea)
            ->select('archivo', 'nombreArchivo')
            ->get();

        // Formar la respuesta, ajustando la URL del archivo para incluir el dominio completo
        $respuesta = [
            'idSemana' => $tarea->idSemana,
            'nombreTarea' => $tarea->nombreTarea,
            'comentario' => $tarea->comentario,
            'textotarea' => $tarea->textoTarea,
            'fechentregado' => $tarea->fechaEntrega,
            'estudiantes' => $estudiantes,
            'archivotarea' => $archivosTarea->map(function ($archivo) {
                return [
                    'archivo' => url(Storage::url($archivo->archivo)),  // Generar la URL completa
                    'nombreArchivo' => $archivo->nombreArchivo
                ];
            }),
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
            $request->validate([
                'textotarea' => 'required|string',
                'archivotarea' => 'nullable|array',
                'archivotarea.*' => 'file|mimes:pdf,zip,rar,7z,txt,png,jpg,jpeg,doc,docx,xls,xlsx',
                'archivosEliminados' => 'nullable|array',
            ]);

            $tarea = Tarea::find($idTarea);

            if (!$tarea) {
                return response()->json(['error' => 'Tarea no encontrada'], 404);
            }

            // Actualizar la descripción de la tarea
            $tarea->textoTarea = $request->input('textotarea');
            $tarea->save();

            // Eliminar archivos si es necesario
            if ($request->has('archivosEliminados')) {
                foreach ($request->input('archivosEliminados') as $archivoNombre) {
                    $archivoTarea = ArchivoTarea::where('idTarea', $idTarea)
                        ->where('nombreArchivo', $archivoNombre)
                        ->first();

                    if ($archivoTarea) {
                        Storage::delete($archivoTarea->archivo);
                        $archivoTarea->delete();
                    }
                }
            }

            // Guardar archivos nuevos si es necesario
            if ($request->hasFile('archivotarea')) {
                foreach ($request->file('archivotarea') as $archivo) {
                    $nombreArchivo = $archivo->getClientOriginalName();

                    // Comprobar si el archivo ya existe en la base de datos
                    $archivoExistente = ArchivoTarea::where('idTarea', $idTarea)
                        ->where('nombreArchivo', $nombreArchivo)
                        ->first();

                    // Si no existe, guardarlo
                    if (!$archivoExistente) {
                        $rutaArchivo = $archivo->storeAs("public/uploads/$idTarea", $nombreArchivo);

                        ArchivoTarea::create([
                            'idTarea' => $idTarea,
                            'archivo' => $rutaArchivo,
                            'nombreArchivo' => $nombreArchivo,
                            'fechaEntrega' => now(),
                        ]);
                    }
                }
            }

            return response()->json(['message' => 'Tarea actualizada correctamente'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
