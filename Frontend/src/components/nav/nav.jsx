import {Routes, Route, Navigate} from 'react-router-dom';
import Home from '../../pages/Home/home.jsx';

import HomeDocente from '../../pages/Docente/homeDocente/homeDocente.jsx'
import HomeGrupoDocente from '../../pages/Docente/homeGrupoDocente/homeGrupoDocente.jsx'
import VerPlanificacionDeDesarolloD from '../../pages/Docente/verPlanificacionDeDesarolloEmpresa/VerPlanificacionDeDesarolloD.jsx'
import ListaVerPlanificacion from '../../pages/Docente/listas/listaVerPlanificacion/listaVerPlanificacion.jsx';
import ListaEmpresas from '../../pages/Docente/listaEmpresas/listaEmpresas.jsx';

import HomeEstudiante from '../../pages/Estudiante/homeEstudiante/homeEstudiante.jsx'
import HomeGrupoEstudiante from '../../pages/Estudiante/homeGrupoEstudiante/homeGrupoEstudiante.jsx'
import VerPlanficacionDeDesarollo from '../../pages/Estudiante/verPlanificacionDeDesarollo/VerPlanifacionDeDesarolloE.jsx';
import ListaSemanas from '../../pages/Estudiante/planificacion/hito/listaSemanas.jsx';
import ListaTareas from '../../pages/Estudiante/planificacion/hito/semana/listaTareas.jsx';
import EditarPlanificacion from '../../pages/Estudiante/editarPlanificacion/editarPlanificacion.jsx';
import ValidarPlanificacion from '../../pages/Docente/validarPlanificacion/validarPlanificacion.jsx';

function Nav() {
  
  return (
    <Routes>
        {/** Ruta para sitios incorrectos */}
        <Route path="*" element={<Navigate to="/" />} />
        
        <Route path='/' element={<Home/>}/>

        <Route path='/homeDocente' element={<HomeDocente/>}/>
        <Route path='/homeDocente/homeGrupoDocente' element={<HomeGrupoDocente/>}/>


        <Route path='/homeDocente/homeGrupoDocente/verPlanificacionDeEmpresas' element={<ListaVerPlanificacion/>}/>
        <Route path='/homeDocente/homeGrupoDocente/verPlanificacionDeEmpresas/Empresa/:idEmpresa' element={<VerPlanificacionDeDesarolloD/>}/>

        {/** Rutas para validar  planificacion */}
        <Route path='/grupoDocente/validarPlanificacion/' element={<ListaEmpresas/>}/>
        <Route path='/grupoDocente/validarPlanificacion/Empresa/:idEmpresa' element={<ValidarPlanificacion/>}/>

        <Route path='/homeEstudiante' element={<HomeEstudiante/>}/>
        <Route path='/homeEstudiante/homeGrupoEstudiante' element={<HomeGrupoEstudiante/>}/>
        <Route path='/homeEstudiante/homeGrupoEstudiante/PlanificacionDeDesarollo/Empresa/:idEmpresa' element={<VerPlanficacionDeDesarollo/>}/>
        <Route path='/homeEstudiante/homeGrupoEstudiante/PlanificacionInicial/Empresa/:idEmpresa' element={<EditarPlanificacion/>}/>

        {/** Rutas para ver la lista de semanas y tareas */}
        <Route path='/grupoEmpresa/planificacion/:idEmpresa/sprint/semana' element={<ListaSemanas/>}/>
        <Route path='/grupoEmpresa/planificacion/:idEmpresa/sprint/semana/tareas' element={<ListaTareas/>}/>
    </Routes>
  )
}

export default Nav