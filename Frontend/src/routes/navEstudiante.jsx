import { Routes, Route, Navigate } from 'react-router-dom';
import HomeGrupoEstudiante from "../pages/Estudiante/homeGrupoEstudiante/homeGrupoEstudiante.jsx";
import ModificarListaTareas from "../pages/Estudiante/HU40_modificarListaTareas/modificarListaTareas.jsx";
import ModificarGrupoEmpresa from "../pages/Estudiante/HU3_HU71_HU69_grupoEmpresa/modificarGrupoEmpresa.jsx";
import GruposDisponibles from "../pages/Estudiante/HU16_gruposDisponibles/gruposDisponibles.jsx"; // Import the new page
import InscribirGrupo from "../pages/Estudiante/HU16_gruposDisponibles/inscribirGrupo.jsx";
import ModificarTarea from "../pages/Estudiante/HU8_modificarTarea/modificarTarea.jsx";
import ListaTareas from "../pages/Estudiante/HU8_modificarTarea/listaTareas.jsx";
import CalificacionesHitoEmpresa from "../pages/Estudiante/HU18_verCalificaciones/calificacionesHitoEmpresa.jsx";
import CrearGrupoEmpresa from "../pages/Estudiante/HU3_HU71_HU69_grupoEmpresa/crearGrupoEmpresa.jsx";
import PublicarGrupoEmpresa from "../pages/Estudiante/HU3_HU71_HU69_grupoEmpresa/publicarGrupoEmpresa.jsx";
import SprintTareas2 from "../pages/Docente/HU38_tareaEstudiante/visualizarSprint.jsx";
import RedirigirHome from '../pages/Estudiante/homeGrupoEstudiante/redirigirHomeEstu.jsx';
function Nav() {
    return (
      <Routes>
        <Route
          path="/"
          element={<RedirigirHome/>}
        />
        <Route path="/homeEstu" element={<HomeGrupoEstudiante />} />
        {/** ROUTES JHON NUEVO FORMATO*/}
        <Route
          path="/homeEstu/modificarListaTareas"
          element={<ModificarListaTareas />}
        />
        {/** ROUTES JHON*/}
        <Route
          path="/:idEstudiante/homeGrupoE/:idGrupo/Empresas/:idEmpresa"
          element={<ListaTareas />}
        />
        <Route  
          path="/:idEstudiante/homeGrupoE/:idGrupo/Empresa/:idEmpresa/sprintSemanaEditarTarea/:idTarea"
          element={<ModificarTarea />}
        />
        <Route
          path="/:idEstudiante/homeGrupoE/:idGrupo/empresa/calificaciones/:idEmpresa"
          element={<CalificacionesHitoEmpresa />}
        />
        {/** ROUTES JOAQUIN*/}
        <Route
          path="/prueba123/:idEmpresa"
          element={<SprintTareas2 />}
        />
        {/** ROUTES JHAIR /homeEstudiante/homeGrupoEstudiante/sprint/:idSprint"*/}
        
        
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
        <Route
          path="/GruposDocente"
          element={<GruposDisponibles />}
        />
        <Route
          path="/GruposDocente/incribirse"
          element={<InscribirGrupo />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }
  
  export default Nav;