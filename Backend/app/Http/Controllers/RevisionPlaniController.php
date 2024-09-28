<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\RevisionPlani;
use Exception;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Http;
use App\Models\Planificacion;

class RevisionPlaniController extends Controller
{
    public function addRevision(Request $request)
    {
        try {
            // validar datos
            $validator = Validator::make($request->all(), [
                'idEmpresa' => 'required|integer',
                'nota' => 'nullable|numeric|min:0|max:100',
                'comentario' => 'nullable|string',
                'idDocente' => 'required|integer',
            ]);
            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Los datos proporcionados no son válidos.',
                    'errors' => $validator->errors()
                ], 422);
            }
            $validatedData = $validator->validated();

            try {
                //obtener el idPlanificacion en base al idEmpresa
                $requestPlani = new Request();
                $requestPlani->merge(['idEmpresa' => $validatedData['idEmpresa']]);

                $response = $this->getIdPlanificacion($requestPlani);
                $idPlanificacion = $response->original['idPlanificacion'];
                //ver si ya existe una revision de la misma planificacion
                $exists = DB::table('revisionplani')
                    ->where('idPlanificacion', $idPlanificacion)
                    ->where('idDocente', $validatedData['idDocente'])
                    ->exists();
                //si existe, eliminarla
                if ($exists != null) {
                    DB::table('revisionplani')
                        ->where('idPlanificacion', $idPlanificacion)
                        ->where('idDocente', $validatedData['idDocente'])
                        ->delete();
                }
                // crear y añadir datos a una nueva revision
                $revisionPlani =  new RevisionPlani();
                $revisionPlani->idPlanificacion = $idPlanificacion;
                $revisionPlani->nota = $validatedData['nota'] ?? null;
                $revisionPlani->comentario = $validatedData['comentario'] ?? null;
                $revisionPlani->idDocente = $validatedData['idDocente'];
                $revisionPlani->save();
                // devolver respuesta exitosa
                return response()->json([
                    'message' => 'Revisión guardada exitosamente.'
                ], 200);
            } catch (Exception $e) {
                // devolver error
                return response()->json([
                    'message' => 'Hubo un error al procesar la solicitud.',
                    'error' => $e->getMessage()
                ], 500);
            }
        } catch (Exception $e) {
            // Capturar otros errores
            return response()->json([
                'message' => 'Hubo un error al procesar la solicitud.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    public function getIdPlanificacion(Request $request)
    {
        //validar datos
        $validatedData = $request->validate([
            'idEmpresa' => 'required|integer',
        ]);
        //buscar la planificacion con ese  idEmpresa
        $planificacion = Planificacion::where('idEmpresa', $validatedData['idEmpresa'])->first();
        if ($planificacion == null) {
            return response()->json(['error' => 'Planificación no encontrada para esta empresa'], 404);
        } else {
            return response()->json(['idPlanificacion' => $planificacion->idPlanificacion]);
        }
    }
}
