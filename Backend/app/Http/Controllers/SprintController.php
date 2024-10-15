<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Planificacion;
use App\Models\Sprint;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class SprintController extends Controller
{
    public function modificarSprint(Request $request): JsonResponse
    {
        $today = Carbon::today()->toDateString();
        $validator = Validator::make($request->all(), [
            'idEmpresa' => 'required|integer|exists:empresa,idEmpresa',
            'sprints' => 'required|array|min:1',
            'sprints.*.fechaIni' => [
                'required',
                'date',
                'after_or_equal:' . $today,
            ],
            'sprints.*.fechaFin' => [
                'required',
                'date',
                'after_or_equal:sprints.*.fechaIni',
            ],
            'sprints.*.cobro' => 'required|integer',
            'sprints.*.fechaEntrega' => [
                'required',
                'date',
                'after_or_equal:sprints.*.fechaFin',
            ],
            'sprints.*.entregables' => 'required|string',
        ]);
        //verificar que ninguno  de los sprints tenga la
        //fecha de inicio anterior a la fecha fin del anterior sprint
        $validator->after(function ($validator) use ($request) {
            $sprints = $request->input('sprints');
            for ($i = 1; $i < count($sprints); $i++) {
                $prevSprintEnd = Carbon::parse($sprints[$i - 1]['fechaFin']);
                $currentSprintStart = Carbon::parse($sprints[$i]['fechaIni']);

                if ($currentSprintStart->lt($prevSprintEnd)) {
                    $validator->errors()->add("sprints.{$i}.fechaIni", 'La fecha de inicio no puede ser anterior a la fecha de fin del sprint anterior.');
                }
            }
        });

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Los datos proporcionados no son válidos.',
                'errors' => $validator->errors()
            ], 422);
        }

        $validatedData = $validator->validated();
        $requestPlani = new Request();
        $requestPlani->merge(['idEmpresa' => $validatedData['idEmpresa']]);
        $response = $this->getIdPlanificacion($requestPlani);
        $idPlanificacion = $response->original['idPlanificacion'];

        try {
            DB::beginTransaction();

            // buscar y eliminar todos los sprints antiguos
            Sprint::where('idPlanificacion', $idPlanificacion)->delete();

            // insertar los sprints actuales
            foreach ($validatedData['sprints'] as $sprintData) {
                $sprint = new Sprint();
                $sprint->idPlanificacion = $idPlanificacion;
                $sprint->fechaIni = $sprintData['fechaIni'];
                $sprint->fechaFin = $sprintData['fechaFin'];
                $sprint->cobro = $sprintData['cobro'];
                $sprint->fechaEntrega = $sprintData['fechaEntrega'];
                $sprint->entregables = $sprintData['entregables'];
                $sprint->notaSprint = $sprintData['notaSprint'] ?? null;
                $sprint->comentariodocente = $sprintData['comentariodocente'] ?? null;
                $sprint->save();
            }

            DB::commit();
            return response()->json([
                'message' => 'La Planificación fue modificada correctamente',
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Hubo un error al modificar la Planificación',
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
    public function testModificarSprint()
    {
        // Simular una solicitud con datos de prueba
        $requestData = [
            'idEmpresa' => 1, // Asegúrate de que este ID exista en tu base de datos
            'sprints' => [
                [
                    'fechaIni' => Carbon::tomorrow()->addDays(3)->toDateString(),
                    'fechaFin' => Carbon::tomorrow()->addDays(7)->toDateString(),
                    'cobro' => 1000,
                    'fechaEntrega' => Carbon::tomorrow()->addDays(8)->toDateString(),
                    'entregables' => 'Entregable de prueba 1',
                    'notaSprint' => 'Nota de prueba 1',
                    'comentariodocente' => 'Comentario de prueba 1'
                ],
                [
                    'fechaIni' => Carbon::tomorrow()->addDays(8)->toDateString(),
                    'fechaFin' => Carbon::tomorrow()->addDays(15)->toDateString(),
                    'cobro' => 1500,
                    'fechaEntrega' => Carbon::tomorrow()->addDays(16)->toDateString(),
                    'entregables' => 'Entregable de prueba 2',
                    'notaSprint' => 'Nota de prueba 2',
                    'comentariodocente' => 'Comentario de prueba 2'
                ]
            ]
        ];

        // Crear una nueva instancia de Request con los datos de prueba
        $request = new Request($requestData);

        // Llamar a la función modificarSprint
        $response = $this->modificarSprint($request);
        return $response;
    }
}
