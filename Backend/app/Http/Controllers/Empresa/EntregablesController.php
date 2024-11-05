<?php

namespace App\Http\Controllers\Empresa;
use App\Models\Entregables;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
class EntregablesController extends Controller
{
    public function guardarEntregables(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'entregables' => 'required|array',
            'entregables.*.idSprint' => 'required|exists:sprint,idSprint',
            'entregables.*.entregables' => 'required|array',
            'entregables.*.entregables.*' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Los datos proporcionados no son válidos.',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            DB::beginTransaction();

            foreach ($request->entregables as $sprintEntregables) {
                $idSprint = $sprintEntregables['idSprint'];
                
                // Delete existing entregables for this sprint
                Entregables::where('idSprint', $idSprint)->delete();

                // Add new entregables
                foreach ($sprintEntregables['entregables'] as $descripcionEntregable) {
                    Entregables::create([
                        'idSprint' => $idSprint,
                        'descripcionEntregable' => $descripcionEntregable,
                    ]);
                }
            }

            DB::commit();

            return response()->json([
                'message' => 'Entregables guardados exitosamente',
            ], 200);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Error al guardar los entregables',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    public function testGuardarEntregables()
    {
        // Create test data
        $testData = [
            'entregables' => [
                [
                    'idSprint' => 5,
                    'entregables' => ['Entregable 1 para Sprint 1', 'Entregable 2 para Sprint 1']
                ],
                [
                    'idSprint' => 6,
                    'entregables' => ['Entregable 1 para Sprint 2', 'Entregable 2 para Sprint 2', 'Entregable 3 para Sprint 2']
                ]
            ]
        ];

        // Create a new request with the test data
        $request = new Request($testData);

        // Call the guardarEntregables function
        $response = $this->guardarEntregables($request);
        return $response;
    }
}
