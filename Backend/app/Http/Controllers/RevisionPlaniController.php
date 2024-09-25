<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\RevisionPlani;
use Exception;
use Illuminate\Support\Facades\DB;

class RevisionPlaniController extends Controller
{
    public function addRevision(Request $request)
    {
        // validar datos
        $validatedData = $request->validate([
            'idPlanificacion' => 'required|integer',
            'nota' => 'nullable|numeric|min:0|max:100',
            'comentario' => 'nullable|string',
            'idDocente' => 'required|integer',
        ]);
        try {
            //ver si ya existe una revision de la misma planificacion
            $exists = DB::table('revisionplani')
                ->where('idPlanificacion', $validatedData['idPlanificacion'])
                ->where('idDocente', $validatedData['idDocente'])
                ->exists();
            //si existe, eliminarla
            if ($exists != null) {
                DB::table('revisionplani')
                    ->where('idPlanificacion', $validatedData['idPlanificacion'])
                    ->where('idDocente', $validatedData['idDocente'])
                    ->delete();
            }
            // crear y añadir datos a una nueva revision
            $revisionPlani =  new RevisionPlani();
            $revisionPlani->idPlanificacion = $validatedData['idPlanificacion'];
            $revisionPlani->nota = $validatedData['nota'] ?? null;
            $revisionPlani->comentario = $validatedData['comentario'] ?? null;
            $revisionPlani->idDocente = $validatedData['idDocente'];
            $revisionPlani->save();
            // devolver respuesta exitosa
            return response()->json([
                'message' => 'Revisión guardada exitosamente.',
                'revision' => $revisionPlani
            ], 200);
        } catch (Exception $e) {
            // devolver error
            return response()->json([
                'message' => 'Hubo un error al procesar la solicitud.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    public function testAdd()
    {
        try {
            // Datos de prueba
            $data = [
                'idPlanificacion' => 1,   // ID de planificación ficticio
                'nota' => 68,            // Nota ficticia
                'comentario' => 'muy bien', // Comentario de prueba
                'idDocente' => 2          // ID de docente ficticio
            ];

            // Simular una petición usando la función store
            $response = $this->addRevision(new Request($data));

            // Devolver la respuesta de la prueba
            return $response;
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Hubo un error en la prueba de la funcionalidad.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
