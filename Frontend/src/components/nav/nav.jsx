import { Routes, Route, Navigate } from "react-router-dom";
//archivos compartidas
import Home from "../../pages/Home/home.jsx";
import VerPlanificacionDeDesarollo from "../../pages/VisualizacionCompartida/verPlanificacionDeDesarollo/VerPlanifacionDeDesarollo.jsx";

//archivos docente
import HomeDocente from "../../pages/Docente/homeDocente/homeDocente.jsx";
import HomeGrupoDocente from "../../pages/Docente/homeGrupoDocente/homeGrupoDocente.jsx";
import ListaVerPlanificacion from "../../pages/Docente/listas/seleccionarEmpresaVisualizar/seleccionarEmpresaVisualizar.jsx";
import SeleccionarEmpresaSinValidar from "../../pages/Docente/listas/seleccionarEmpresaSinValidar/seleccionarEmpresaSinValidar.jsx";
import ValidarPlanificacion from "../../pages/Docente/validarPlanificacion/validarPlanificacion.jsx";
import EvaluacionSemanal from "../../pages/Docente/evaluacionSemanal/evaluacionSemanal.jsx";
import CalificarEstSemana from "../../pages/Docente/calificarSprint/calificarEstudiante/calificarEstSemana.jsx";

//archivos estudiante
import HomeEstudiante from "../../pages/Estudiante/homeEstudiante/homeEstudiante.jsx";
import HomeGrupoEstudiante from "../../pages/Estudiante/homeGrupoEstudiante/homeGrupoEstudiante.jsx";
import ModificarPlanificacion from "../../pages/Estudiante/editarPlanificacion/editarPlanificacion.jsx";
import ModificarTarea from "../../pages/Estudiante/editarPlanificacion/modificarTarea/modificarTarea.jsx";

import VisualizarSprintEst from "../../pages/Estudiante/visualizarSprintEstudiante/visualizarSprint.jsx";
import VisualizarTarea from "../../pages/Estudiante/tareaEstudiante/viualizarTarea.jsx";
import ModificarListaTareas from "../../pages/Estudiante/editarPlanificacion/modificarListaTareas/modificarListaTareas.jsx";

import CrearGrupoEmpresa from "../../pages/Estudiante/grupoEmpresa/crearGrupoEmpresa.jsx";
import GruposDisponibles from "../../pages/Estudiante/gruposDisponibles/gruposDisponibles.jsx"; // Import the new page
import InscribirGrupo from "../../pages/Estudiante/gruposDisponibles/inscribirGrupo.jsx";
import ObtenerEstudiantesPorGrupo from "../../pages/Docente/listas/listaEstudiantes/listaEstudiantes.jsx";
import ObtenerEstudiantesPorGrupoA from "../../pages/Docente/listas/listaEstudiantes/listaEstudiantesA.jsx";
import EmpresasPorDocente from "../../pages/Docente/listas/listaEmpresas/listaEmpresaPorDocente.jsx";
import ModificarTarea2 from "../../pages/Estudiante/modificarTarea/modificarTarea.jsx";
import CalificacionesHitoEmpresa from "../../pages/Estudiante/grupoEmpresa/calificacionesHitoEmpresa.jsx";
import SeleccionarEmpresaVisualizar from "../../pages/Docente/listas/seleccionarEmpresaVisualizar/seleccionarEmpresaVisualizar.jsx";

function Nav() {
  return (
    <Routes>
      {/** Ruta compartidas*/}
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/" element={<Home />} />

      {/** Seleccionar una planificacion para visualizar*/}
      <Route
        path="/visualizarPlanificacion"
        element={<ListaVerPlanificacion />}
      />

      {/** Visualizar Planificacion*/}
      <Route
        path="/visualizarPlanificacion/Empresa/:idEmpresa"
        element={<VerPlanificacionDeDesarollo />}
      />

      {/** Ruta Docente*/}
      <Route path="/homeDocente" element={<HomeDocente />} />
      <Route
        path="/homeDocente/homeGrupoDocente"
        element={<HomeGrupoDocente />}
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
      {/** Evaluacion Semanal */}
      <Route
        path="/evaluacionSemanal/empresa/:idEmpresa/sprint/:idSprint"
        element={<EvaluacionSemanal />}
      />

      {/** Rutas Adrian*/}

      {/** Rutas Joaquin*/}
      <Route
        path="/homeEstudiante/homeGrupoEstudiante/sprint/:idSprint"
        element={<VisualizarSprintEst />}
      />
      <Route
        path="/homeEstudiante/homeGrupoEstudiante/sprint/:idSprint/tarea/:idTarea"
        element={<VisualizarTarea />}
      />
      <Route
        path="/homeEstudiante/homeGrupoEstudiante/crearGrupo"
        element={<CrearGrupoEmpresa />}
      />

      {/** Ruta Estudiante*/}
      <Route path="/homeEstudiante" element={<HomeEstudiante />} />
      <Route
        path="/homeEstudiante/homeGrupoEstudiante"
        element={<HomeGrupoEstudiante />}
      />

      <Route
        path="/homeEstudiante/homeGrupoEstudiante/sprint/semana/tareas2/:idTarea"
        element={<ModificarTarea />}
      />
      
      <Route
        path="/homeEstudiante/homeGrupoEstudiante/sprint/semana/tareas/:idTarea"
        element={<ModificarTarea2 />}
      />
      <Route
        path="/homeEstudiante/homeGrupoEstudiante/empresas/:idEmpresa/calificaciones"
        element={<CalificacionesHitoEmpresa />}
      />

      {/** Modificar Planificacion */}
      <Route
        path="/modificarPlanificacion/Empresa/:idEmpresa"
        element={<ModificarPlanificacion />}
      />

      {/** Modificar Lista de Tareas */}
      <Route
        path="/modificarListaTareas/empresa/:idEmpresa/sprint/:idSprint/semana/:idSemana"
        element={<ModificarListaTareas />}
      />

      <Route
        path="/homeEstudiante/gruposDisponibles"
        element={<GruposDisponibles />}
      />
      <Route
        path="/homeEstudiante/inscribirGrupo/:idGrupo"
        element={<InscribirGrupo />}
      />
      <Route
        path="/homeGrupoDocente/listaEstudiantes/:idGrupo/:gestionGrupo"
        element={<ObtenerEstudiantesPorGrupo />}
      />
      <Route
        path="/homeGrupoDocente/listaEstudiantesA/:idGrupo/:gestionGrupo"
        element={<ObtenerEstudiantesPorGrupoA />}
      />
      <Route
        path="/homeGrupoDocente/listaEmpresas/:idDocente"
        element={<EmpresasPorDocente />}
      />
      <Route
        path="/homeDcoente/visCalificar"
        element={<CalificarEstSemana />}
      />

    </Routes>
  );
}

export default Nav;
