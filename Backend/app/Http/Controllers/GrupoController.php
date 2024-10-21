<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use function Laravel\Prompts\select;

class GrupoController extends Controller
{
    public function obtenerTodosLosGrupos()
    {
        // Consulta para obtener los datos de todos los grupos y los docentes asociados
        $gruposDocentes = DB::table('grupo')
            ->join('docente', 'grupo.idDocente', '=', 'docente.idDocente')
            ->select(
                'grupo.idGrupo',
                'grupo.numGrupo', 
                'docente.nombreDocente as nombre', 
                'docente.primerApellido as apellidoPaterno', 
                'docente.segundoApellido as apellidoMaterno', 
                //'grupo.gestionGrupo'
            )
            ->where('grupo.gestionGrupo','=','2024-2')
            ->get();

        // Si no se encuentran resultados
        if ($gruposDocentes->isEmpty()) {
            return response()->json(['message' => 'No se encontraron grupos.'], 404);
        }

        return response()->json($gruposDocentes, 200);
    }

    public function obtenerEstudiantesPorGrupo($idGrupo,$gestionGrupo)
    {
        /*$request->validate([
            'idGrupo' => 'required|integer',
            'gestionGrupo' => 'required|string'
        ]);*/
        // Consulta para obtener todos los estudiantes y el docente del grupo
        $datosGrupo = DB::table('estudiantesgrupos')
            ->join('grupo', 'estudiantesgrupos.idGrupo', '=', 'grupo.idGrupo')
            ->join('estudiante', 'estudiantesgrupos.idEstudiante', '=', 'estudiante.idEstudiante')
            ->join('docente', 'grupo.idDocente', '=', 'docente.idDocente')
            ->join('estudiantesempresas AS ee', 'estudiantesgrupos.idEstudiante', '=', 'ee.idEstudiante')
            ->join('empresa AS emp', 'ee.idEmpresa', '=', 'emp.idEmpresa')
            ->where('grupo.idGrupo',"=",   $idGrupo)
            ->where('grupo.gestionGrupo',$gestionGrupo)
            ->select(
                'grupo.numGrupo', 
                'estudiante.idEstudiante',
                'estudiante.nombreEstudiante as nombreEstudiante', 
                'estudiante.primerApellido as apellidoPaternoEstudiante', 
                'estudiante.segundoApellido as apellidoMaternoEstudiante',
                'emp.nombreEmpresa'
                /*'docente.nombreDocente as nombreDocente', 
                'docente.primerApellido as apellidoPaternoDocente', 
                'docente.segundoApellido as apellidoMaternoDocente'*/
            )
            ->get();

        // Si no se encuentran resultados
        if ($datosGrupo->isEmpty()) {
            return response()->json(['message' => 'No se encontraron estudiantes o docentes para este grupo.'], 404);
        }

        return response()->json($datosGrupo, 200);
    }
    public function obtenerEmpresasPorGrupoYDocente($idDocente)
    {
        // Validar los parámetros de entrada
        /*$request->validate([
            'idDocente' => 'required|integer',
            //'gestionGrupo' => 'required|string',
            //'idGrupo' => 'required|integer'
        ]);*/
    
        // Ejecutar la consulta
            $resultados = DB::table('estudiantesgrupos AS eg')
            ->join('grupo AS g', 'eg.idGrupo', '=', 'g.idGrupo')
            ->join('docente AS d', 'g.idDocente', '=', 'd.idDocente')
            ->join('estudiantesempresas AS ee', 'eg.idEstudiante', '=', 'ee.idEstudiante')
            ->join('empresa AS emp', 'ee.idEmpresa', '=', 'emp.idEmpresa')
            ->join('estudiante AS e', 'eg.idEstudiante', '=', 'e.idEstudiante')
            ->select('emp.nombreEmpresa','emp.nombreLargo', 'g.gestionGrupo', DB::raw('count(eg.idEstudiante) as totalEstudiantes'), 'g.numGrupo')
            ->where('d.idDocente', $idDocente)
           // ->where('g.idGrupo', $request->idGrupo)
            //->where('g.gestionGrupo', $request->gestionGrupo)
            ->groupBy('emp.nombreEmpresa', 'emp.nombreLargo','g.gestionGrupo', 'g.numGrupo')
            -> orderByDesc('g.gestionGrupo')
            ->orderBy('emp.nombreEmpresa')
            ->get();
        
    
        if ($resultados->isEmpty()) {
            return response()->json([
                'message' => 'No se encontraron registros para el grupo y/o gestión especificados.'
            ], 404); // Puedes devolver un código 404 o cualquier otro código de estado
        }
    
        // Si hay resultados, retornarlos
        return response()->json($resultados);
    }
    public function getDescripcion($id)
    {
        // Recupera la descripción del curso basado en el ID
        $datosCurso = DB::table('grupo')
            ->join('docente AS d', 'grupo.idDocente','=','d.idDocente')
            ->select(
                'grupo.numGrupo',
                'd.nombreDocente as nombreDocente', 
                'd.primerApellido as apellidoPaternoDocente', 
                'd.segundoApellido as apellidoMaternoDocente',
                'grupo.descripcion'
            )
            ->where('idGrupo', $id) // Asegúrate de usar solo el nombre de la columna
            ->first(); // Usa first() para obtener un solo resultado
    
        // Verifica si se encontraron datos
        if (!$datosCurso) {
            return response()->json(['message' => 'Curso no encontrado'], 404);
        }
    
        // Devuelve los datos en formato JSON
        return response()->json($datosCurso);
    }

    public function barraBusquedaEmpresas(Request $request)
    {
        $request->validate([
            'termino' => 'required|string',
            //'idDocente' => 'required|integer'
        ]);
    
        $termino = $request->input('termino');
        $idDocente = 1;
    
        $busqueda = DB::table('estudiantesgrupos AS eg')
            ->join('grupo AS g', 'eg.idGrupo', '=', 'g.idGrupo')
            ->join('docente AS d', 'g.idDocente', '=', 'd.idDocente')
            ->join('estudiantesempresas AS ee', 'eg.idEstudiante', '=', 'ee.idEstudiante')
            ->join('empresa AS emp', 'ee.idEmpresa', '=', 'emp.idEmpresa')
            ->join('estudiante AS e', 'eg.idEstudiante', '=', 'e.idEstudiante')
            ->select('emp.nombreEmpresa', 'emp.nombreLargo', 'g.gestionGrupo', DB::raw('COUNT(eg.idEstudiante) AS totalEstudiantes'), 'g.numGrupo')
            ->where('emp.nombreEmpresa', 'like', "%$termino%") // Usar el término proporcionado
            ->where('d.idDocente', $idDocente) // Usar el ID del docente proporcionado
            ->groupBy('emp.nombreEmpresa', 'emp.nombreLargo', 'g.gestionGrupo', 'g.numGrupo')
            ->orderByDesc('g.gestionGrupo')
            ->orderBy('emp.nombreEmpresa')
            ->get();
            if (!$busqueda) {
                return response()->json(['message' => 'Curso no encontrado'], 404);
            }
        return response()->json($busqueda);
    }
    public function barraBusquedaEstudiante(Request $request)
    {
        $request->validate([
            'idGrupo' => 'required|integer',
            'gestionGrupo' => 'required|string',
            'termino' => 'required|string'
        ]);
        $valor = $request->input('termino');
        $idGrupo = $request->input('idGrupo');
        $gestionGrupo = $request->input('gestionGrupo');
        /*if($valor->isEmpty()){
            return $this -> obtenerEstudiantesPorGrupo($request -> idGrupo,$request -> gestionGrupo);
        }*/
        // Consulta para obtener todos los estudiantes y el docente del grupo
        $datosGrupo = DB::table('estudiantesgrupos')
            ->join('grupo', 'estudiantesgrupos.idGrupo', '=', 'grupo.idGrupo')
            ->join('estudiante', 'estudiantesgrupos.idEstudiante', '=', 'estudiante.idEstudiante')
            ->join('docente', 'grupo.idDocente', '=', 'docente.idDocente')
            ->join('estudiantesempresas AS ee', 'estudiantesgrupos.idEstudiante', '=', 'ee.idEstudiante')
            ->join('empresa AS emp', 'ee.idEmpresa', '=', 'emp.idEmpresa')
            ->where('estudiante.nombreEstudiante', 'like', "%$valor%")
            ->where('grupo.idGrupo',"=",   $request -> idGrupo)
            ->where('grupo.gestionGrupo',$request -> gestionGrupo)
            ->select(
                //'grupo.numGrupo', 
                'estudiante.nombreEstudiante as nombreEstudiante', 
                'estudiante.primerApellido as apellidoPaternoEstudiante', 
                'estudiante.segundoApellido as apellidoMaternoEstudiante',
                'emp.nombreEmpresa'
                /*'docente.nombreDocente as nombreDocente', 
                'docente.primerApellido as apellidoPaternoDocente', 
                'docente.segundoApellido as apellidoMaternoDocente'*/
            )
            ->get();

        // Si no se encuentran resultados
        if (empty(trim($valor))) {
            return $this->obtenerEstudiantesPorGrupo($idGrupo, $gestionGrupo);
        }

        return response()->json($datosGrupo, 200);
    }

    public function darDeBaja(Request $request) {
        $request->validate([
            'idGrupo' => 'required|integer',
            'idEstudiante' => 'required|integer',
        ]);
    
        // Realizar la eliminación después de aplicar la condición 'where'
        $idBaja = DB::table('estudiantesgrupos')
            ->where('idGrupo', $request->idGrupo)  // Condición para el grupo
            ->where('idEstudiante', $request->idEstudiante)  // Condición para el estudiante
            ->delete();
    
        // Verificar si se eliminó alguna fila
        if ($idBaja) {
            return response()->json(['success' => 'Estudiante dado de baja exitosamente'], 200);
        } else {
            return response()->json(['error' => 'No se pudo dar de baja al estudiante'], 400);
        }
    }

}
