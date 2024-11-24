import { Routes, Route, Navigate } from 'react-router-dom';
import HomeGrupoDocente from "../pages/Docente/homeGrupoDocente/homeGrupoDocente.jsx";
import EvaluacionSemanal from "../pages/Docente/HU7_evaluacionSemanal/evaluacionSemanal.jsx";
import VerEvaluacionSemanal from "../pages/Docente/HU77_calificarEstudiante/calificarEstSemana.jsx";
import CalificarSprint from "../pages/Docente/HU34_calificarSprint/calificarSprintU.jsx";
import ListaSprints from "../pages/Docente/HU34_calificarSprint/listaSprints.jsx";
import ObtenerEstudiantesPorGrupo from "../pages/Docente/HU32_listaEstudiantes/listaEstudiantes.jsx";
import EmpresasPorDocente from "../pages/Docente/HU31_listaEmpresas/listaEmpresaPorDocente.jsx";
import SeleccionarEmpresaVisualizar from "../pages/VisualizacionCompartida/HU36_verPlanificacionDeDesarollo/seleccionarEmpresaVisualizar/seleccionarEmpresaVisualizar.jsx";
import SeleccionarEmpresaModificar from "../pages/Docente/AHUCompartidasDelEstudiante/seleccionarEmpresaModificar/seleccionarEmpresaModificar.jsx";
import SeleccionarEmpresaPublicar from "../pages/Docente/AHUCompartidasDelEstudiante/seleccionarEmpresaPublicar/seleccionarEmpresaPublicar.jsx";
import SeleccionarEmpresaVerSprints from "../pages/Docente/listas/seleccionarEmpresaVerSprints/seleccionarEmpresaVerSprints.jsx";
import SeleccionarEmpresaSinValidar from "../pages/Docente/HU33_validarPlanificacion/seleccionarEmpresaSinValidar/seleccionarEmpresaSinValidar.jsx";
import ValidarPlanificacion from "../pages/Docente/HU33_validarPlanificacion/validarPlanificacion.jsx";
//import ListaVerPlanificacion from "../pages/Docente/listas/seleccionarEmpresaVisualizar/seleccionarEmpresaVisualizar.jsx";
import ListaEmpresaSprints from "../pages/Docente/HU34_calificarSprint/listaEmpresaSprints.jsx";
import EvaluacionSemanalListaEmpresas from "../pages/Docente/HU7_evaluacionSemanal/EvaluacionSemanalListaEmpresas.jsx";
import EvaluacionSemanalSprints from "../pages/Docente/HU7_evaluacionSemanal/EvaluacionSemanalSprints.jsx";
//ACCIONES COMPARTIDAS
import ListaCali from "../pages/Docente/AHUCompartidasDelEstudiante/HU18_listaVerCalificaciones/listaCalificaciones.jsx";
import CalificacionesHitoEmpresa from "../pages/Estudiante/HU18_verCalificaciones/calificacionesHitoEmpresa.jsx";
import EmpresasParaTareas from "../pages/Docente/HU38_tareaEstudiante/seleccionarEmpresaParaVisualizar.jsx";
import VisualizarTarea from "../pages/Docente/HU38_tareaEstudiante/viualizarTarea.jsx";
import VisualizarSprintEst from "../pages/Docente/HU38_tareaEstudiante/visualizarSprint.jsx";
import VerEvaluacionSemanalSprints from '../pages/Docente/HU77_calificarEstudiante/listaSprintsVerCalificacionesSemanales.jsx'
import VerEvaluacionSemanalListaEmpresas from '../pages/Docente/HU77_calificarEstudiante/listaEmpresasVerCalificaciones.jsx'
import RedirigirHome from '../pages/Docente/homeGrupoDocente/redirigirHome.jsx';
function Nav() {
  return (
    <Routes>

      <Route
        path="/"
        element={<RedirigirHome/>}
      />
      <Route
        path="/homeDocente"
        element={<HomeGrupoDocente />}
      />
      {/** ROUTES JHON NUEVOFORMATO*/}
      <Route
        path="/homeDocente/listaEstudiantes"
        element={<ObtenerEstudiantesPorGrupo />}
      />
      <Route
        path="/homeDocente/listaEmpresas"
        element={<EmpresasPorDocente />}
      />
      <Route
        path="/homeDocente/listaEmpresasEvaluacionSemanal"
        element={<EvaluacionSemanalListaEmpresas />}
      />
      <Route
        path="/homeDocente/listaEmpresasEvaluacionSemanal/empresaSprints"
        element={<EvaluacionSemanalSprints />}
      />
      <Route
        path="/homeDocente/listaEmpresasEvaluacionSemanal/empresaSprints/semana"
        element={<EvaluacionSemanal />}
      />

      <Route
        path="/homeDocente/listaEmpresaCalificarSprints"
        element={<ListaEmpresaSprints />}
      />
      <Route
        path="/homeDocente/listaEmpresaCalificarSprints/empresa"
        element={<ListaSprints />}
      />
      <Route
        path="/homeDocente/listaEmpresaCalificarSprints/empresa/sprint"
        element={<CalificarSprint />}
      />
          {/** ROUTES COMPARTIDAS JHON NUEVO FORMATO*/} 
          <Route
            path="/homeDocente/listaEmpresaCalificaciones"
            element={<ListaCali/>}
          />
          <Route
            path="/homeDocente/listaEmpresaCalificaciones/empresa"
            element={<CalificacionesHitoEmpresa/>}
          />
      {/** ROUTES JOAQUIN NUEVO FORMATO*/}
      <Route
        path="/homeDocente/listaEmpresaVerCalificacionesSemanal"
        element={<VerEvaluacionSemanalListaEmpresas />}
      />
      <Route
        path="/homeDocente/listaEmpresaVerCalificacionesSemanal/empresaSprints"
        element={<VerEvaluacionSemanalSprints />}
      />
      <Route
        path="/homeDocente/listaEmpresaVerCalificacionesSemanal/empresaSprints/semana"
        element={<VerEvaluacionSemanal />}
      />
      {/** ROUTES JOAQUIN*/}
      <Route
          path="/homeGrupo/:idGrupo/empresasVerTareas"
          element={<EmpresasParaTareas />}
      />
      <Route
          path="/homeGrupo/:idGrupo/empresasVerTareas/:idEmpresa"
          element={<VisualizarSprintEst />}
      />
      <Route
          path="/homeGrupo/:idGrupo/empresaVerTareas/:idEmpresa/SprintSemanatarea/:idTarea"
          element={<VisualizarTarea />}
      />

      {/** ROUTES JHAIR*/}

      {/** Seleccionar una planificacion para visualizar*/}
      <Route
        path="/visualizarPlanificacion"
        element={<SeleccionarEmpresaVisualizar />}
      />

      {/** Seleccione una Planificacion para Modificar */}
      <Route
        path="/modificarPlanificacion/"
        element={<SeleccionarEmpresaModificar />}
      />

      {/** Seleccione una Planificacion para Publicar */}
      <Route
        path="/publicarPlanificacion/"
        element={<SeleccionarEmpresaPublicar />}
      />

      {/** Seleccione una empresa para ver sus sprints*/}

      <Route
        path="/visualizarSprint/"
        element={<SeleccionarEmpresaVerSprints />}
      />

      {/** Seleccionar una planificacion para validar*/}
      <Route
        path="/validarPlanificacion/"
        element={<SeleccionarEmpresaSinValidar />}
      />

      {/** Validar Planificacion */}
      <Route
        path="/validarPlanificacion/empresa/:idEmpresa"
        element={<ValidarPlanificacion />}
      />

      <Route
        path="/validarPlanificacion/empresa/:idEmpresa"
        element={<ValidarPlanificacion />}
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default Nav;
