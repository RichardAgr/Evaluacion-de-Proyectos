import { Routes, Route, Navigate } from 'react-router-dom';
//archivos compartidas
import Home from '../../pages/Home/home.jsx';
import VerPlanificacionDeDesarollo from '../../pages/VisualizacionCompartida/verPlanificacionDeDesarollo/VerPlanifacionDeDesarollo.jsx'


//archivos docente
import HomeDocente from '../../pages/Docente/homeDocente/homeDocente.jsx'
import HomeGrupoDocente from '../../pages/Docente/homeGrupoDocente/homeGrupoDocente.jsx'
import ListaVerPlanificacion from '../../pages/Docente/listas/listaVerPlanificacion/listaVerPlanificacion.jsx';
import ListaEmpresas from '../../pages/Docente/listas/listaEmpresas/listaEmpresas.jsx'
import ValidarPlanificacion from '../../pages/Docente/validarPlanificacion/validarPlanificacion.jsx';
import TareaPagina from '../../pages/Docente/gestionEmpresasTareas/tareaPagina.jsx';
import CalificarEmpresas from '../../pages/Docente/gestionEmpresasTareas/calificarEmpresas.jsx';
import SprintsEmpresas from '../../pages/Docente/gestionEmpresasTareas/sprintsEmpresas.jsx';
import SprintsSemanas from '../../pages/Docente/gestionEmpresasTareas/sprintsSemanas.jsx';
import CalificarSprint from '../../pages/Docente/calificarSprint/calificarSprint.jsx';
import CalificarTarea from '../CalificarTarea/CalificarTarea.jsx';


//archivos estudiante
import HomeEstudiante from '../../pages/Estudiante/homeEstudiante/homeEstudiante.jsx'
import HomeGrupoEstudiante from '../../pages/Estudiante/homeGrupoEstudiante/homeGrupoEstudiante.jsx'
import EditarPlanificacion from '../../pages/Estudiante/editarPlanificacion/editarPlanificacion.jsx';
import ModificarTarea from '../../pages/Estudiante/editarPlanificacion/modificarTarea/modificarTarea.jsx'

import VisualizarSprintEst from '../../pages/Estudiante/visualizarSprintEstudiante/visualizarSprint.jsx';
import VisualizarTarea from '../../pages/Estudiante/tareaEstudiante/viualizarTarea.jsx';
import ModificarListaTareas from '../../pages/Estudiante/editarPlanificacion/modificarListaTareas/modificarListaTareas.jsx'

import CrearGrupoEmpresa from '../../pages/Estudiante/grupoEmpresa/crearGrupoEmpresa.jsx';
import GruposDisponibles from '../../pages/Estudiante/gruposDisponibles/gruposDisponibles.jsx'; // Import the new page
import InscribirGrupo from '../../pages/Estudiante/gruposDisponibles/inscribirGrupo.jsx';
import ObtenerEstudiantesPorGrupo from '../../pages/Docente/listas/listaEstudiantes/listaEstudiantes.jsx';
import EmpresasPorDocente from '../../pages/Docente/listas/listaEmpresas/listaEmpresaPorDocente.jsx';
function Nav() {

  return (

    <Routes>
      {/** Ruta compartidas*/}
      <Route path="*" element={<Navigate to="/" />} />
      <Route path='/' element={<Home />} />

      {/** Ruta Docente*/}
      <Route path='/homeDocente' element={<HomeDocente />} />
      <Route path='/homeDocente/homeGrupoDocente' element={<HomeGrupoDocente />} />
      <Route path='/homeDocente/homeGrupoDocente/verPlanificacionDeEmpresas' element={<ListaVerPlanificacion />} />
      <Route path='/homeDocente/homeGrupoDocente/verPlanificacionDeEmpresas/Empresa/:idEmpresa' element={<VerPlanificacionDeDesarollo />} />
      <Route path='/grupoDocente/validarPlanificacion/' element={<ListaEmpresas />} />
      <Route path='/grupoDocente/validarPlanificacion/Empresa/:idEmpresa' element={<ValidarPlanificacion />} />
      {/** Rutas Adrian*/}
      <Route path='/grupoDocente/calificarTareasEmpresas/:idDocente/empresas' element={<CalificarEmpresas />} />
      <Route path='/grupoDocente/calificarTareasEmpresas/empresas/:idEmpresa/:idDocente/sprints' element={<SprintsEmpresas />} />
      <Route path='/grupoDocente/calificarTareasEmpresas/empresas/sprints/:idSprint/:idEmpresa/:idDocente/semanas' element={<SprintsSemanas />} />
      <Route path='/grupoDocente/calificarTareasEmpresas/empresas/sprints/semanas/tareas/:idTarea/:idSprint/:idEmpresa/:idDocente/tarea' element={<TareaPagina />} />


      {/** Rutas Joaquin*/}
      <Route path ='/homeEstudiante/homeGrupoEstudiante/sprint/:idSprint' element={<VisualizarSprintEst />} />
      <Route path ='/homeEstudiante/homeGrupoEstudiante/sprint/:idSprint/tarea/:idTarea' element={<VisualizarTarea />} />
      <Route path ='/homeEstudiante/homeGrupoEstudiante/crearGrupo' element={<CrearGrupoEmpresa/>}/>
      <Route path ='/homeEstudiante/homeGrupoEstudiante/calificar/:idTarea' element={<CalificarTarea/>}/>


      {/** Ruta Estudiante*/}
      <Route path='/homeEstudiante' element={<HomeEstudiante />} />
      <Route path='/homeEstudiante/homeGrupoEstudiante' element={<HomeGrupoEstudiante />} />
      <Route path='/homeEstudiante/homeGrupoEstudiante/PlanificacionDeDesarollo/Empresa/:idEmpresa' element={<VerPlanificacionDeDesarollo />} />
      <Route path='/homeEstudiante/homeGrupoEstudiante/PlanificacionInicial/Empresa/:idEmpresa' element={<EditarPlanificacion />} />
      <Route path='/homeEstudiante/homeGrupoEstudiante/sprint/semana/tareas/:idTarea' element={<ModificarTarea />} />
        {/** Ruta Docente*/}
        <Route path='/grupoDocente/empresa/:idEmpresa/planificacion/calificarSprint/:idSprint' element={<CalificarSprint/>}/>

        {/** Ruta Estudiante*/}
        <Route path='/grupoEstudiante/sprint/semana/:idSemana/modificarListaTareas' element={<ModificarListaTareas/>}/>

        <Route path='/homeEstudiante/gruposDisponibles' element={<GruposDisponibles />} />
        <Route path='/homeEstudiante/inscribirGrupo/:idGrupo' element={<InscribirGrupo />} />
        <Route path="/homeGrupoDocente/listaEstudiantes/:idGrupo/:gestionGrupo" element={<ObtenerEstudiantesPorGrupo />} />
        <Route path='/homeGrupoDocente/listaEmpresas' element={<EmpresasPorDocente />} />
    </Routes>
  )
}

export default Nav