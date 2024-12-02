<?php

namespace App\Http\Controllers;

use App\Models\EvaluacionesGrupo;
use App\Models\Criterio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class EvaluacionesGrupoController extends Controller
{
    public function configurarEvaluacion(Request $request)
    {
        $request->validate([
            'criterios' => 'required|array',
            'criterios.*.descripcion' => 'required|string',
            'criterios.*.notaMaxima' => 'required|integer|min:1',
            'tipoEvaluacion' => 'required|in:evaluacionPares,evaluacionCruzada,autoevaluacion',
            'idGrupo' => 'required|exists:grupo,idGrupo',
            'fechaEvaluacion' => 'required|date',
        ]);

        try {
            DB::beginTransaction();
            EvaluacionesGrupo::where('idGrupo', $request->idGrupo)->delete();

            $evaluacionesGrupo = new EvaluacionesGrupo;
            $evaluacionesGrupo->idGrupo = $request->idGrupo;
            $evaluacionesGrupo->tipoEvaluacion = $request->tipoEvaluacion;
            $evaluacionesGrupo->fechaEvaluacion = Carbon::parse($request->fechaEvaluacion)->format('Y-m-d H:i:s');
            $evaluacionesGrupo->save();


            // eliminar los criterios anteriores si es que existen
            Criterio::where('idEvaluacionesGrupo', $evaluacionesGrupo->idEvaluacionesGrupo)->delete();

            // añade nuevos criterios
            foreach ($request->criterios as $criterioData) {
                Criterio::create([
                    'idEvaluacionesGrupo' => $evaluacionesGrupo->idEvaluacionesGrupo,
                    'descripcion' => $criterioData['descripcion'],
                    'rangoMaximo' => $criterioData['notaMaxima'],
                ]);
            }


            DB::commit();

            return response()->json([
                'message' => 'Evaluación de grupo creada con éxito',
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Error al crear la evaluación de grupo: ' . $e->getMessage()], 500);
        }
    }
    public function testConfigurarEvaluacion()
    {
        // Simular una solicitud con datos de prueba
        $requestData = [
            'criterios' => [
                ['descripcion' => 'Criterio 1', 'notaMaxima' => 30],
                ['descripcion' => 'Criterio 2', 'notaMaxima' => 40],
                ['descripcion' => 'Criterio 3', 'notaMaxima' => 30],
            ],
            'tipoEvaluacion' => 'evaluacionPares',
            'idGrupo' => 1,
            'fechaEvaluacion' => now(),
        ];

        // Crear una nueva instancia de Request con los datos de prueba
        $request = new Request($requestData);

        // Llamar a la función configurarEvaluacion
        $response = $this->configurarEvaluacion($request);
        return $response;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
