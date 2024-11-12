import { Routes, Route } from "react-router-dom";
import HomeEstudiante from "../pages/Estudiante/homeEstudiante/homeEstudiante.jsx";
import HomeGrupoEstudiante from "../pages/Estudiante/homeGrupoEstudiante/homeGrupoEstudiante.jsx";
import ModificarPlanificacion from "../pages/Estudiante/editarPlanificacion/editarPlanificacion.jsx";
import PublicarPlanificacion from "../pages/Estudiante/publicarPlanificacion/publicarPlanificacion.jsx";
import VisualizarSprintEst from "../pages/Estudiante/visualizarSprintEstudiante/visualizarSprint.jsx";
import VisualizarTarea from "../pages/Estudiante/tareaEstudiante/viualizarTarea.jsx";
import ModificarListaTareas from "../pages/Estudiante/editarPlanificacion/modificarListaTareas/modificarListaTareas.jsx";
import ModificarGrupoEmpresa from "../pages/Estudiante/grupoEmpresa/modificarGrupoEmpresa.jsx";
import GruposDisponibles from "../pages/Estudiante/gruposDisponibles/gruposDisponibles.jsx"; // Import the new page
import InscribirGrupo from "../pages/Estudiante/gruposDisponibles/inscribirGrupo.jsx";
import ModificarTarea from "../pages/Estudiante/modificarTarea/modificarTarea.jsx";
import ListaTareas from "../pages/Estudiante/modificarTarea/listaTareas.jsx";
import CalificacionesHitoEmpresa from "../pages/Estudiante/grupoEmpresa/calificacionesHitoEmpresa.jsx";
import CrearGrupoEmpresa from "../pages/Estudiante/grupoEmpresa/crearGrupoEmpresa.jsx";
import PublicarGrupoEmpresa from "../pages/Estudiante/grupoEmpresa/publicarGrupoEmpresa.jsx";
import EmpresasParaTareas from "../pages/Estudiante/visualizarSprintEstudiante/seleccionarEmpresaParaVisualizar.jsx";

import SprintTareas2 from "../pages/Estudiante/visualizarSprintEstudiante/visualizarSprint.jsx";

function Nav() {
    return (
      <Routes>
        {/** ROUTES JHON*/}
        <Route
          path="/:idEstudiante/homeGrupoE/:idGrupo/sprintE/:idSprint"
          element={<ListaTareas />}
        />
        <Route  
          path="/:idEstudiante/homeGrupoE/:idGrupo/sprintE/:idSprint/semana/editarTarea/:idTarea"
          element={<ModificarTarea />}
        />
        <Route
          path="/:idEstudiante/homeGrupoE/:idGrupo/empresa/:idEmpresa/calificaciones"
          element={<CalificacionesHitoEmpresa />}
        />
        {/** ROUTES JOAQUIN*/}
        <Route
          path="/:idEstudiante/homeGrupoE/:idGrupo/empresaTareas"
          element={<EmpresasParaTareas />}
        />
        <Route
          path="/prueba123/:idEmpresa"
          element={<SprintTareas2 />}
        />
        <Route
          path="/:idEstudiante/homeGrupoE/:idGrupo/empresas/:idEmpresa"
          element={<VisualizarSprintEst />}
        />
        {/** ROUTES JHAIR /homeEstudiante/homeGrupoEstudiante/sprint/:idSprint"*/}
        
        <Route
          path="/homeEstudiante/homeGrupoEstudiante/sprint/:idSprint/tarea/:idTarea"
          element={<VisualizarTarea />}
        />
        <Route
          path="/homeEstudiante/homeGrupoEstudiante/crearGrupo/:idEstudiante"
          element={<CrearGrupoEmpresa />}
        />
        <Route
          path="/homeEstudiante/homeGrupoEstudiante/modificarGrupo/:idEstudiante"
          element={<ModificarGrupoEmpresa />}
        />
        <Route
        path="/homeEstudiante/homeGrupoEstudiante/publicarEmpresa/:idEstudiante"
        element={<PublicarGrupoEmpresa />}
        />
        <Route path="/homeEstudiante" element={<HomeEstudiante />} />
        <Route
          path="/homeEstudiante/homeGrupoEstudiante"
          element={<HomeGrupoEstudiante />}
        />
        <Route
          path="/modificarPlanificacion/Empresa/:idEmpresa"
          element={<ModificarPlanificacion />}
        />
        <Route
          path="/publicarPlanificacion/Empresa/:idEmpresa"
          element={<PublicarPlanificacion />}
        />
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
      </Routes>
    );
  }
  
  export default Nav;