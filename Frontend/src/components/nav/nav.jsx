import {Routes, Route, Navigate} from 'react-router-dom';
//archivos compartidas
import Home from '../../pages/Home/home.jsx';
import VerPlanificacionDeDesarollo from '../../pages/VisualizacionCompartida/verPlanificacionDeDesarollo/VerPlanifacionDeDesarollo.jsx'

//archivos docente
import HomeDocente from '../../pages/Docente/homeDocente/homeDocente.jsx'
import HomeGrupoDocente from '../../pages/Docente/homeGrupoDocente/homeGrupoDocente.jsx'
import ListaVerPlanificacion from '../../pages/Docente/listas/seleccionarEmpresaVisualizar/seleccionarEmpresaVisualizar.jsx';
import SeleccionarEmpresaSinValidar from '../../pages/Docente/listas/seleccionarEmpresaSinValidar/seleccionarEmpresaSinValidar.jsx'
import ValidarPlanificacion from '../../pages/Docente/validarPlanificacion/validarPlanificacion.jsx';
import EvaluacionSemanal from  '../../pages/Docente/evaluacionSemanal/evaluacionSemanal.jsx';

//archivos estudiante
import HomeEstudiante from '../../pages/Estudiante/homeEstudiante/homeEstudiante.jsx'
import HomeGrupoEstudiante from '../../pages/Estudiante/homeGrupoEstudiante/homeGrupoEstudiante.jsx'
import ModificarPlanificacion from '../../pages/Estudiante/editarPlanificacion/editarPlanificacion.jsx';
import ModificarTarea from '../../pages/Estudiante/editarPlanificacion/modificarTarea/modificarTarea.jsx'
import ModificarListaTareas from '../../pages/Estudiante/editarPlanificacion/modificarListaTareas/modificarListaTareas.jsx'

function Nav() {
  
  return (
    
    <Routes>
      {/** Ruta compartidas*/}
        <Route path="*" element={<Navigate to="/" />} />
        <Route path='/' element={<Home/>}/>

        {/** Seleccionar una planificacion para visualizar*/}
        <Route path='/visualizarPlanificacion' element={<ListaVerPlanificacion/>}/>

        {/** Visualizar Planificacion*/}
        <Route path='/visualizarPlanificacion/Empresa/:idEmpresa' element={<VerPlanificacionDeDesarollo/>}/>
       
      {/** Rutas Docente*/}
        <Route path='/homeDocente' element={<HomeDocente/>}/>
        <Route path='/homeDocente/homeGrupoDocente' element={<HomeGrupoDocente/>}/>


        {/** Seleccionar una planificacion para validar*/}
        <Route path='/validarPlanificacion/' element={<SeleccionarEmpresaSinValidar/>}/>
        
        {/** Validar Planificacion */}
        <Route path='/validarPlanificacion/empresa/:idEmpresa' element={<ValidarPlanificacion/>}/>
        
        {/** Evaluacion Semanal */}
        <Route path='/evaluacionSemanal/empresa/:idEmpresa/sprint/:idSprint' element={<EvaluacionSemanal/>}/>

      {/** Rutas Estudiante*/}
        <Route path='/homeEstudiante' element={<HomeEstudiante/>}/>
        <Route path='/homeEstudiante/homeGrupoEstudiante' element={<HomeGrupoEstudiante/>}/>

        {/** Modificar Planificacion */}
        <Route path='/modificarPlanificacion/Empresa/:idEmpresa' element={<ModificarPlanificacion/>}/>

        {/** Modificar Tarea */}
        <Route path='/homeEstudiante/homeGrupoEstudiante/sprint/semana/tareas/:idTarea' element={<ModificarTarea/>}/>
      
        {/** Modificar Lista de Tareas */}
        <Route path='/modificarListaTareas/empresa/:idEmpresa/sprint/:idSprint/semana/:idSemana' element={<ModificarListaTareas/>}/>
    </Routes>
  )
}

export default Nav