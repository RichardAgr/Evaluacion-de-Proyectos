import {Routes, Route} from 'react-router-dom';
import Home from '../../pages/Home/home.jsx';

import HomeDocente from '../../pages/Docente/homeDocente/homeDocente.jsx'
import HomeGrupoDocente from '../../pages/Docente/homeGrupoDocente/homeGrupoDocente.jsx'
import VerPlanificacionDeDesarolloD from '../../pages/Docente/verPlanificacionDeDesarolloEmpresa/VerPlanificacionDeDesarolloD.jsx'
import ListaVerPlanificacion from '../../pages/Docente/listas/listaVerPlanificacion/listaVerPlanificacion.jsx';

import HomeEstudiante from '../../pages/Estudiante/homeEstudiante/homeEstudiante.jsx'
import HomeGrupoEstudiante from '../../pages/Estudiante/homeGrupoEstudiante/homeGrupoEstudiante.jsx'
import VerPlanficacionDeDesarollo from '../../pages/Estudiante/verPlanificacionDeDesarollo/VerPlanifacionDeDesarolloE.jsx';
import EditarPlanificacion from '../../pages/Estudiante/editarPlanificacion/editarPlanificacion.jsx';


import GruposDisponibles from '../../pages/Estudiante/gruposDisponibles/gruposDisponibles.jsx'; // Import the new page
import InscribirGrupo from '../../pages/Estudiante/gruposDisponibles/inscribirGrupo.jsx';
function Nav() {
  
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/homeDocente' element={<HomeDocente/>}/>
        <Route path='/homeDocente/homeGrupoDocente' element={<HomeGrupoDocente/>}/>
        <Route path='/homeDocente/homeGrupoDocente/verPlanificacionDeEmpresas' element={<ListaVerPlanificacion/>}/>
        <Route path='/homeDocente/homeGrupoDocente/verPlanificacionDeEmpresas/Empresa/:idEmpresa' element={<VerPlanificacionDeDesarolloD/>}/>

        <Route path='/homeEstudiante' element={<HomeEstudiante/>}/>
        <Route path='/homeEstudiante/homeGrupoEstudiante' element={<HomeGrupoEstudiante/>}/>
        <Route path='/homeEstudiante/homeGrupoEstudiante/PlanificacionDeDesarollo/Empresa/:idEmpresa' element={<VerPlanficacionDeDesarollo/>}/>
        <Route path='/homeEstudiante/homeGrupoEstudiante/PlanificacionInicial/Empresa/:idEmpresa' element={<EditarPlanificacion/>}/>

        <Route path='/homeEstudiante/gruposDisponibles' element={<GruposDisponibles />} />
        <Route path='/homeEstudiante/inscribirGrupo/:idGrupo' element={<InscribirGrupo />} />
    </Routes>
  )
}

export default Nav