import {Routes, Route} from 'react-router-dom';
import Home from '../../pages/Home/home.jsx'

import HomeDocente from '../../pages/Docente/homeDocente/homeDocente.jsx'
import HomeGrupoDocente from '../../pages/Docente/homeGrupoDocente/homeGrupoDocente.jsx'

import HomeEstudiante from '../../pages/Estudiante/homeEstudiante/homeEstudiante.jsx'
import HomeGrupoEstudiante from '../../pages/Estudiante/homeGrupoEstudiante/homeGrupoEstudiante.jsx'
import EstudiantePlanificacion from '../../pages/Estudiante/planificacion/planificacion.jsx'
function nav() {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>

        <Route path='/homeDocente' element={<HomeDocente/>}/>
        <Route path='/homeDocente/homeGrupoDocente' element={<HomeGrupoDocente/>}/>

        <Route path='/homeDocente' element={<HomeEstudiante/>}/>
        <Route path='/homeDocente/homeGrupoEstudiante' element={<HomeGrupoEstudiante/>}/>
        <Route path='/homeDocente/homeGrupoEstudiante/planificacion' element={<EstudiantePlanificacion/>}/>
    </Routes>
  )
}

export default nav