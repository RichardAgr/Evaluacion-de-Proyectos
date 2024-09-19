import {Routes, Route} from 'react-router-dom';
import Home from '../../pages/Home/home.jsx'

import HomeDocente from '../../pages/Docente/homeDocente/homeDocente.jsx'
import HomeGrupoDocente from '../../pages/Docente/homeGrupoDocente/homeGrupoDocente.jsx'

import HomeEstudiante from '../../pages/Estudiante/homeEstudiante/homeEstudiante.jsx'
import HomeGrupoEstudiante from '../../pages/Estudiante/homeGrupoEstudiante/homeGrupoEstudiante.jsx'
import EstudiantePlanificacion from '../../pages/Estudiante/planificacion/planificacion.jsx'
import EditarPlanificacion from '../../pages/Estudiante/editarPlanificacion/editarPlanificacion.jsx'
import ValidarPlanificacion from '../../pages/Docente/gestionGrupo/validarPlanificacion.jsx'

function nav() {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>

        <Route path='/homeDocente' element={<HomeDocente/>}/>
        <Route path='/homeDocente/homeGrupoDocente' element={<HomeGrupoDocente/>}/>

        <Route path='/homeDocente' element={<HomeEstudiante/>}/>
        <Route path='/homeDocente/homeGrupoEstudiante' element={<HomeGrupoEstudiante/>}/>
        <Route path='/homeEstudiante/homeGrupoEstudiante/verPlanificacion' element={<EstudiantePlanificacion/>}/>
        <Route path='/homeEstudiante/homeGrupoEstudiante/editarPlanificacion' element={<EditarPlanificacion/>}/>
        <Route path='/homeDocente/homeGrupoEstudiante/validarPlanificacion' element={<ValidarPlanificacion/>}/>
    </Routes>
  )
}

export default nav