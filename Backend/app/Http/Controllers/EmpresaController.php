<?php

namespace App\Http\Controllers;

use App\Models\Empresa;
use App\Models\Semana;
use App\Models\NotasSemana;
use App\Models\Estudiante;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;

class EmpresaController extends Controller
{
    public function getEmpresaData($id)
    {
        // Obtener la empresa con el ID proporcionado
        $empresa = Empresa::with('estudiantes')->find($id);

        // Verificar si la empresa existe
        if (!$empresa) {
            return response()->json(['error' => 'Empresa no encontrada'], 404);
        }

        // Formatear los datos
        $data = [
            'nombreEmpresa' => $empresa->nombreEmpresa,
            'nombreLargo' => $empresa->nombreLargo,
            'integrantes' => $empresa->estudiantes->map(function ($estudiante) {
                return [
                    'nombreEstudiante' => $estudiante->nombreEstudiante,
                    'primerApellido' => $estudiante->primerApellido,
                    'segundoApellido' => $estudiante->segundoApellido,
                ];
            }),
        ];

        // Devolver los datos en formato JSON
        return response()->json($data);
    }
    public function getNombreEmpresa($id)
    {
        // Obtener la empresa con el ID proporcionado
        $empresa = Empresa::with('estudiantes')->find($id);

        // Verificar si la empresa existe
        if (!$empresa) {
            return response()->json(['error' => 'Empresa no encontrada'], 404);
        }

        // Formatear los datos
        $data = [
            'nombreEmpresa' => $empresa->nombreEmpresa,
            'nombreLargo' => $empresa->nombreLargo,
        ];

        // Devolver los datos en formato JSON
        return response()->json($data);
    }


    // En el futuro debera filtrar por ID del docente !!!!!!!!
    // formato aproximado:

    // $empresas = Empresa::whereHas('docente', function($query) use ($idDocente) {
    //     $query->where('idDocente', $idDocente);
    // })->orderBy('nombreEmpresa', 'asc')->get();

    public function getListaEmpresas()
    {
        // esta formateado para buscar por orden alfabetico
        $empresa = Empresa::orderBy('nombreEmpresa', 'asc')->get();

        // Devolver error si no existe
        if (!$empresa) {
            return response()->json(['error' => 'Empresa no encontrada'], 404);
        }

        // Formatear xd
        $data = $empresa->map(function ($empresa) {
            return [
                'idEmpresa' => $empresa->idEmpresa,
                'nombreEmpresa' => $empresa->nombreEmpresa,
                'nombreLargo' => $empresa->nombreLargo,
            ];
        });


        //return response()->json($data);
        return $data;
    }
    public function obtenerSprints($idEmpresa, $idDocente)
    {
        try {

            $empresa = Empresa::findOrFail($idEmpresa);

            $sprints = $empresa->sprints;

            return response()->json([
                'success' => true,
                'nombre' => $empresa->nombreEmpresa,
                'nombreLargo' => $empresa->nombreLargo,
                'idDocente' => $idDocente,
                'sprints' => $sprints
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener los sprints: ' . $e->getMessage()
            ], 500);
        }
    }

    public function getCalificacionesEmpresa($idEmpresa)
    {
        try {
            // Obtener la empresa y sus estudiantes
            $empresa = Empresa::with('estudiantes')->findOrFail($idEmpresa);

            // Obtener todos los sprints asociados a la empresa
            $sprints = $empresa->sprints;

            // Crear un arreglo para almacenar las calificaciones por estudiante y sprint
            $calificaciones = [];

            // Iterar sobre cada estudiante en la empresa
            foreach ($empresa->estudiantes as $estudiante) {
                $calificacionesEstudiante = [
                    'estudiante' => [
                        'nombre' => $estudiante->nombreEstudiante,
                        'primerApellido' => $estudiante->primerApellido,
                        'segundoApellido' => $estudiante->segundoApellido,
                    ],
                    'promediosPorSprint' => []
                ];

                // Obtener el promedio de notas por sprint para el estudiante
                foreach ($sprints as $sprint) {
                    $semanas = Semana::where('idSprint', $sprint->idSprint)->get();
                    $totalNotas = 0;
                    $cantidadNotas = 0;

                    foreach ($semanas as $semana) {
                        $notasSemana = NotasSemana::where('idSemana', $semana->idSemana)
                            ->where('idEstudiante', $estudiante->idEstudiante)
                            ->get();

                        foreach ($notasSemana as $nota) {
                            $totalNotas += $nota->nota;
                            $cantidadNotas++;
                        }
                    }

                    // Calcular el promedio de las notas en este sprint
                    $promedio = $cantidadNotas > 0 ? $totalNotas / $cantidadNotas : 0;

                    // Almacenar el promedio en el arreglo
                    $calificacionesEstudiante['promediosPorSprint'][] = [
                        'sprint' => $sprint->idSprint,
                        'promedio' => $promedio
                    ];
                }

                $calificaciones[] = $calificacionesEstudiante;
            }

            // Retornar las calificaciones en formato JSON
            return response()->json([
                'nombre' => $empresa->nombreEmpresa,
                'nombreLargo' => $empresa->nombreLargo,
                'calificaciones' => $calificaciones
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error al obtener las calificaciones: ' . $e->getMessage()
            ], 500);
        }
    }
}
