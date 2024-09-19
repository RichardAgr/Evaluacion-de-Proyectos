import {Routes, Route} from 'react-router-dom';
import Home from '../../pages/Home/home.jsx';

import HomeDocente from '../../pages/Docente/homeDocente/homeDocente.jsx'
import HomeGrupoDocente from '../../pages/Docente/homeGrupoDocente/homeGrupoDocente.jsx'

import HomeEstudiante from '../../pages/Estudiante/homeEstudiante/homeEstudiante.jsx'
import HomeGrupoEstudiante from '../../pages/Estudiante/homeGrupoEstudiante/homeGrupoEstudiante.jsx'
import PlanificacionDeDesarollo from '../../pages/Estudiante/planificacionDeDesarollo/PlanifacionDeDesarollo.jsx';
import EstudiantePlanificacion from '../../pages/Estudiante/planificacion/planificacion.jsx'

function nav() {
  
  return (
    <Routes>
        <Route path='/' element={<PlanificacionDeDesarollo/>}/>

        <Route path='/homeDocente' element={<HomeDocente/>}/>
        <Route path='/homeDocente/homeGrupoDocente' element={<HomeGrupoDocente/>}/>

        <Route path='/homeEstudiante' element={<HomeEstudiante/>}/>
        <Route path='/homeEstudiante/homeGrupoEstudiante' element={<HomeGrupoEstudiante/>}/>
        <Route path='/homeEstudiante/homeGrupoEstudiante/Empresa/:idEmpresa' element={<PlanificacionDeDesarollo/>}/>
        <Route path='/homeEstudiante/homeGrupoEstudiante/Empresa/planificacion' element={<EstudiantePlanificacion/>}/>
    </Routes>
  )
}

export default nav