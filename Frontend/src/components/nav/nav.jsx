import {Routes, Route, Navigate} from 'react-router-dom';
//import Home from '../../pages/Home/home.jsx';
import VerPlanficacionDeDesarollo from '../../pages/VisualizacionCompartida/verPlanificacionDeDesarollo/VerPlanifacionDeDesarollo.jsx'

import HomeDocente from '../../pages/Docente/homeDocente/homeDocente.jsx'
import HomeGrupoDocente from '../../pages/Docente/homeGrupoDocente/homeGrupoDocente.jsx'
import ListaVerPlanificacion from '../../pages/Docente/listas/listaVerPlanificacion/listaVerPlanificacion.jsx';
import ListaEmpresas from '../../pages/Docente/listaEmpresas/listaEmpresas.jsx';

import HomeEstudiante from '../../pages/Estudiante/homeEstudiante/homeEstudiante.jsx'
import HomeGrupoEstudiante from '../../pages/Estudiante/homeGrupoEstudiante/homeGrupoEstudiante.jsx'

import EditarPlanificacion from '../../pages/Estudiante/editarPlanificacion/editarPlanificacion.jsx';
import ValidarPlanificacion from '../../pages/Docente/validarPlanificacion/validarPlanificacion.jsx';

import ModificarTarea from '../../pages/Estudiante/modificarTarea/modificarTarea.jsx';
function Nav() {
  
  return (
    
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/homeDocente' element={<HomeDocente/>}/>
        <Route path='/homeDocente/homeGrupoDocente' element={<HomeGrupoDocente/>}/>


        <Route path='/homeDocente/homeGrupoDocente/verPlanificacionDeEmpresas' element={<ListaVerPlanificacion/>}/>
        <Route path='/homeDocente/homeGrupoDocente/verPlanificacionDeEmpresas/Empresa/:idEmpresa' element={<VerPlanificacionDeDesarolloD/>}/>

        {/** Rutas para validar  planificacion */}
        <Route 
          path='/grupoDocente/validarPlanificacion/' 
          element={<ListaEmpresas/>}
        />
        
        <Route path='/grupoDocente/validarPlanificacion/Empresa/:idEmpresa' element={<ValidarPlanificacion/>}/>

        <Route path='/homeEstudiante' element={<HomeEstudiante/>}/>
        <Route path='/homeEstudiante/homeGrupoEstudiante' element={<HomeGrupoEstudiante/>}/>
        <Route path='/homeEstudiante/homeGrupoEstudiante/PlanificacionDeDesarollo/Empresa/:idEmpresa' element={<VerPlanficacionDeDesarollo/>}/>
        <Route path='/homeEstudiante/homeGrupoEstudiante/PlanificacionInicial/Empresa/:idEmpresa' element={<EditarPlanificacion/>}/>
        <Route path='/homeEstudiante/homeGrupoEstudiante/sprint/semana/tareas/:idTarea' element={<ModificarTarea/>}/>
    </Routes>
  )
}

export default Nav