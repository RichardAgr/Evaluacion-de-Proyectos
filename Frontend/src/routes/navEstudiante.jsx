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

//traido desde docnete
import ListaSprintsVerTareas from '../pages/Docente/HU38_tareaEstudiante/visualizarSprint.jsx'
import VerTarea from '../pages/Docente/HU38_tareaEstudiante/viualizarTarea.jsx'

import ListaSprintsVerSeguimiento from '../pages/Docente/HU7_evaluacionSemanal/EvaluacionSemanalSprints.jsx'
import VerSeguimientoSemanal from '../pages/Estudiante/HU77_SegumientosSemanales/evaluacionSemanal.jsx'

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
        <Route
          path="/homeEstu/listaTareas"
          element={<ListaTareas />}
        />
        <Route  
          path="/homeEstu/listaTareas/modificarTarea"
          element={<ModificarTarea />}
        />
        <Route
          path="/homeEstu/VerCalificacionesSprints"
          element={<CalificacionesHitoEmpresa />}
        />
        {/** ROUTES JHON*/}
        
        {/** ROUTES JOAQUIN*/}
        <Route
          path="/homeEstu/listaSprintsSemanasTareas"
          element={<ListaSprintsVerTareas />}
        />
        <Route
          path="/homeEstu/listaSprintsSemanasTareas/verTarea"
          element={<VerTarea />}
        />
        <Route
          path="/homeEstu/listaSprintsVerSeguimiento"
          element={<ListaSprintsVerSeguimiento />}
        />
        <Route
          path="/homeEstu/listaSprintsVerSeguimiento/verSeguimientoSemanal"
          element={<VerSeguimientoSemanal />}
        />
        <Route
          path="/prueba123/:idEmpresa"
          element={<SprintTareas2 />}
        />
        {/** ROUTES JHAIR /homeEstudiante/homeGrupoEstudiante/sprint/:idSprint"*/}
        
        
        <Route
          path="/homeEstu/CrearGrupoEmpresa"
          element={<CrearGrupoEmpresa />}
        />
        <Route
          path="/homeEstu/ModificarGrupoEmpresa"
          element={<ModificarGrupoEmpresa />}
        />

        <Route
          path="/homeEstu/PublicarGrupoEmpresa"
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