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
function Nav() {
  return (
    <Routes>

      
      <Route
        path="/"
        element={<HomeGrupoDocente />}
      />

      {/** ROUTES JHON*/}
      
      <Route
        path="/homeGrupo/:idGrupo/listaEmpresas/evaluacionSemanal"
        element={<EvaluacionSemanalListaEmpresas />}
      />
      <Route
        path="/homeGrupo/:idGrupo/listaEmpresas/evaluacionSemanal/:idEmpresa"
        element={<EvaluacionSemanalSprints />}
      />
      <Route
        path="/homeGrupo/:idGrupo/listaEmpresas/evaluacionSemanal/:idEmpresa/Sprint/:idSprint/semana/:idSemana"
        element={<EvaluacionSemanal />}
      />
      <Route
        path="/homeGrupo/:idGrupo/listaEmpresaCalificarSprints"
        element={<ListaEmpresaSprints />}
      />
      <Route
        path="/homeGrupo/:idGrupo/listaEmpresaCalificarSprints/:idEmpresa"
        element={<ListaSprints />}
      />
      <Route
        path="/homeGrupo/:idGrupo/listaEmpresaCalificarSprints/:idEmpresa/sprint/:idSprint"
        element={<CalificarSprint />}
      />
      <Route
        path="/homeGrupo/:idGrupo/listaEstudiantes/:gestionGrupo" //NO_NECESITAS_GESTION
        element={<ObtenerEstudiantesPorGrupo />}
      />
      <Route
        path="/homeGrupo/:idGrupo/listaEmpresas/:idDocente" //NO_NECESITAS_DOCENTE
        element={<EmpresasPorDocente />}
      />
          {/** ROUTES COMPARTIDAS JHON*/} 
          <Route
              path="/homeGrupo/:idGrupo/empresa/calificaciones"
              element={<ListaCali/>}
            />
          <Route
            path="/homeGrupo/:idGrupo/empresa/calificaciones/:idEmpresa"
            element={<CalificacionesHitoEmpresa/>}
          />
      {/** ROUTES JOAQUIN*/}
      <Route
        path="/homeEstudiante/visCalificar"
        element={<VerEvaluacionSemanalListaEmpresas />}
      />
      <Route
        path="/homeEstudiante/visCalificar/:idEmpresa"
        element={<VerEvaluacionSemanalSprints />}
      />
      <Route
        path="/homeEstudiante/visCalificar/:idEmpresa/sprint/:idSprint/Semana/:idSemana"
        element={<VerEvaluacionSemanal />}
      />
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
