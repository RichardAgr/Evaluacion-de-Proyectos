import {Routes, Route, Navigate} from 'react-router-dom';
//archivos compartidas
import Home from '../../pages/Home/home.jsx';
import VerPlanificacionDeDesarollo from '../../pages/VisualizacionCompartida/verPlanificacionDeDesarollo/VerPlanifacionDeDesarollo.jsx'

//archivos docente
import HomeDocente from '../../pages/Docente/homeDocente/homeDocente.jsx'
import HomeGrupoDocente from '../../pages/Docente/homeGrupoDocente/homeGrupoDocente.jsx'
import ListaVerPlanificacion from '../../pages/Docente/listas/listaVerPlanificacion/listaVerPlanificacion.jsx';
import ListaEmpresas from '../../pages/Docente/listas/listaEmpresas/listaEmpresas.jsx'
import ValidarPlanificacion from '../../pages/Docente/validarPlanificacion/validarPlanificacion.jsx';
import TareaPagina from '../../pages/Docente/validarTarea/tareaPagina.jsx';

//archivos estudiante
import HomeEstudiante from '../../pages/Estudiante/homeEstudiante/homeEstudiante.jsx'
import HomeGrupoEstudiante from '../../pages/Estudiante/homeGrupoEstudiante/homeGrupoEstudiante.jsx'
import EditarPlanificacion from '../../pages/Estudiante/editarPlanificacion/editarPlanificacion.jsx';
import ModificarTarea from '../../pages/Estudiante/editarPlanificacion/modificarTarea/modificarTarea.jsx'

function Nav() {
  
  return (
    
    <Routes>
        {/** Ruta compartidas*/}
        <Route path="*" element={<Navigate to="/" />} />
        <Route path='/' element={<Home/>}/>

        {/** Ruta Docente*/}
        <Route path='/homeDocente' element={<HomeDocente/>}/>
        <Route path='/homeDocente/homeGrupoDocente' element={<HomeGrupoDocente/>}/>
        <Route path='/homeDocente/homeGrupoDocente/verPlanificacionDeEmpresas' element={<ListaVerPlanificacion/>}/>
        <Route path='/homeDocente/homeGrupoDocente/verPlanificacionDeEmpresas/Empresa/:idEmpresa' element={<VerPlanificacionDeDesarollo/>}/>
        <Route path='/grupoDocente/validarPlanificacion/' element={<ListaEmpresas/>}/>
        <Route path='/grupoDocente/validarPlanificacion/Empresa/:idEmpresa' element={<ValidarPlanificacion/>}/>
        <Route path='/grupoDocente/validarPlanificacion/Empresa/sprint/semana/tareas/tarea/:idTarea' element={<TareaPagina/>}/>

        {/** Ruta Estudiante*/}
        <Route path='/homeEstudiante' element={<HomeEstudiante/>}/>
        <Route path='/homeEstudiante/homeGrupoEstudiante' element={<HomeGrupoEstudiante/>}/>
        <Route path='/homeEstudiante/homeGrupoEstudiante/PlanificacionDeDesarollo/Empresa/:idEmpresa' element={<VerPlanificacionDeDesarollo/>}/>
        <Route path='/homeEstudiante/homeGrupoEstudiante/PlanificacionInicial/Empresa/:idEmpresa' element={<EditarPlanificacion/>}/>
        <Route path='/homeEstudiante/homeGrupoEstudiante/sprint/semana/tareas/:idTarea' element={<ModificarTarea/>}/>
    </Routes>
  )
}

export default Nav