<?php

namespace App\Http\Controllers;

use App\Models\Evaluacion;
use Illuminate\Http\Request;

class EvaluacionController extends Controller
{
    public function getDatosParaEvaluar($idEstudiante)
    {
        $evaluacion = Evaluacion::where('idEvaluadorEstudiante', $idEstudiante)->first();
        if ($evaluacion === null) {
            return response()->json(['error' => 'No se encontró la evaluación'], 404);
        } else {
            $evaluacionGrupo = $evaluacion->evaluacionGrupo;
            $fechaEvaluacion = $evaluacionGrupo->fechaEvaluacion;
            $tipoEvaluacion = $evaluacion->evaluacionGrupo->tipoEvaluacion;
            if ($tipoEvaluacion === 'autoevaluacion') {
                $evaluado = $evaluacion->evaluadoEstudiante;
            } elseif ($tipoEvaluacion === 'evaluacionCruzada') {
                $evaluado = $evaluacion->evaluadoEmpresa;
            } elseif ($tipoEvaluacion === 'evaluacionPares') {
                $evaluado = $evaluacion->evaluadoEstudiante;
            } else {
                return response()->json(['error' => 'Tipo de evaluación no válido'], 400);
            }
            if ($evaluado === null) {
                return response()->json(['error' => 'No se encontró el evaluado'], 404);
            }
            $criterios = $evaluacionGrupo->criterios;
            if ($criterios->isEmpty()) {
                return response()->json(['error' => 'No se encontraron criterios para esta evaluación'], 404);
            }
            $response = [
                'tipoEvaluacion' => $tipoEvaluacion,
                'fechaEvaluacion' => $fechaEvaluacion,
                'evaluado' => $tipoEvaluacion === 'evaluacionCruzada'
                    ? $evaluado->nombreEmpresa
                    : $evaluado->nombreEstudiante . ' ' . $evaluado->primerApellido . ' ' . $evaluado->segundoApellido,
                'criterios' => $criterios->map(function ($criterio) {
                    return [
                        'id' => $criterio->idCriterio,
                        'descripcion' => $criterio->descripcion,
                        'rangoMaximo' => $criterio->rangoMaximo,
                    ];
                }),
            ];
            return response()->json($response);
        }
    }
}
