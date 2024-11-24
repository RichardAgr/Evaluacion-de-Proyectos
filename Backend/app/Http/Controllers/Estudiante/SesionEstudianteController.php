<?php
namespace App\Http\Controllers\Estudiante;
use App\Http\Controllers\Controller;
use App\Models\Estudiante;
use App\Models\Docente;
use App\Models\Empresa;
use App\Models\Grupo;
use App\Models\Planificacion;
use App\Models\Sprint;
use App\Models\Semana;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response;
use Carbon\Carbon;

class SesionEstudianteController extends Controller
{  

    
    function getDataEstudiante() {
        // Fecha actual
        $now = Carbon::now();
        $idEstudiante = session('estudiante.id');
    
        // Obtener el estudiante y su nombre completo
        $estudiante = Estudiante::find($idEstudiante);
        $nombreCompleto = trim("{$estudiante->nombreEstudiante} {$estudiante->primerApellido} {$estudiante->segundoApellido}");
    
        // Obtener la empresa asociada al estudiante
        $empresa = $estudiante->empresas()->first();  // Usamos la relación de Estudiante con Empresas
        $idEmpresa = $empresa ? $empresa->idEmpresa : -1;
    
        // Obtener el grupo asociado al estudiante
        $grupo = $estudiante->grupos()->first();  // Usamos la relación de Estudiante con Grupos
        $idGrupo = $grupo ? $grupo->idGrupo : -1;
    
        // Obtener la planificación aceptada y publicada a través de la empresa asociada
        $planificacion = Planificacion::where('idEmpresa', $idEmpresa)->first();
        $idPlanificacion = $planificacion ? $planificacion->idPlanificacion : -1;
        $aceptada = $planificacion ? $planificacion->aceptada : -1;
        $publicada = $planificacion ? $planificacion->publicada : -1;
    
        // Validar sprint si hay planificación aceptada
        $idSprint = -1;
        $sprint = Sprint::where('idPlanificacion', $idPlanificacion)
                        ->whereDate('fechaIni', '<=', $now)
                        ->whereDate('fechaFin', '>=', $now)
                        ->first();
        if ($sprint) {
            $idSprint = $sprint->idSprint;
        }
    
        // Validar semana
        $idSemana = -1;
        $semana = Semana::whereDate('fechaIni', '<=', $now)
                        ->whereDate('fechaFin', '>=', $now)
                        ->first();
        if ($semana) {
            $idSemana = $semana->idSemana;
        }
    
        return response()->json([
            "idEstudiante" => $idEstudiante,
            'nombreCompleto' => $nombreCompleto,
            'idEmpresa' => $idEmpresa,
            'idPlanificacion' => $idPlanificacion,
            'aceptada' => $aceptada,
            'publicada' => $publicada,
            'idSprint' => $idSprint,
            'idSemana' => $idSemana,
            'idGrupo' => $idGrupo
        ], 200);
    }
    
    
    public function getGrupoSesion() {
        if ($idEstudiante = session('estudiante.id')) {
            $grupo = DB::table('grupo as g')
                ->join('estudiantesgrupos as eg', 'g.idGrupo', '=', 'eg.idGrupo')
                ->where('eg.idEstudiante', $idEstudiante)
                ->select('g.idGrupo') // Seleccionar solo el campo necesario
                ->first();
            if ($grupo) {
                return response()->json(['idGrupo' => $grupo->idGrupo], 200);
            }
            return response()->json(['idGrupo' => '-1'], 200);
        }
        return response()->json(['error' => 'Usuario no encontrado'], 404);
    }
}