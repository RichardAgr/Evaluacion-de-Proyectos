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

function Nav() {
    return (
      <Routes>
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
          element={<ModificarGrupoEmpresa />}
        />
        <Route
          path="/homeEstudiante/homeGrupoEstudiante/crearGrupo1"
          element={<CrearGrupoEmpresa />}
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
          path="/homeEstudiante/homeGrupoEstudiante/sprintE/:idSprint/semana/editarTarea/:idTarea"
          element={<ModificarTarea />}
        />
        <Route
          path="/homeEstudiante/homeGrupoEstudiante/sprintE/:idSprint"
          element={<ListaTareas />}
        />
        <Route
          path="/homeEstudiante/homeGrupoEstudiante/empresas/:idEmpresa/calificaciones"
          element={<CalificacionesHitoEmpresa />}
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