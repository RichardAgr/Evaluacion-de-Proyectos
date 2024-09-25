import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../../pages/Home/home.jsx";

import HomeDocente from "../../pages/Docente/homeDocente/homeDocente.jsx";
import HomeGrupoDocente from "../../pages/Docente/homeGrupoDocente/homeGrupoDocente.jsx";
import VerPlanificacionDeDesarolloD from "../../pages/Docente/verPlanificacionDeDesarolloEmpresa/VerPlanificacionDeDesarolloD.jsx";
import ValidarPlanificacion from "../../pages/Docente/validarPlanificacion/validarPlanificacion.jsx";
import ListaEmpresas from "../../pages/Docente/listaEmpresas/listaEmpresas.jsx";
import ListaVerPlanificacion from '../../pages/Docente/listas/listaVerPlanificacion/listaVerPlanificacion.jsx';

import HomeEstudiante from '../../pages/Estudiante/homeEstudiante/homeEstudiante.jsx'
import HomeGrupoEstudiante from '../../pages/Estudiante/homeGrupoEstudiante/homeGrupoEstudiante.jsx'
import VerPlanficacionDeDesarollo from '../../pages/Estudiante/verPlanificacionDeDesarollo/VerPlanifacionDeDesarolloE.jsx';
import EditarPlanificacion from '../../pages/Estudiante/editarPlanificacion/editarPlanificacion.jsx';
function Nav() {
  
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/homeDocente' element={<HomeDocente/>}/>
        <Route path='/homeDocente/homeGrupoDocente' element={<HomeGrupoDocente/>}/>
        <Route path='/homeDocente/homeGrupoDocente/verPlanificacion' element={<ListaVerPlanificacion/>}/>
        <Route path='/homeDocente/homeGrupoDocente/verPlanificacion/Empresa/:idEmpresa' element={<VerPlanificacionDeDesarolloD/>}/>
        
        <Route path='/homeDocente/homeGrupoDocente/validarPlanificacion/' element={<ListaEmpresas/>}/>
        <Route path='/homeDocente/homeGrupoDocente/validarPlanificacion/Empresa/:idEmpresa' element={<ValidarPlanificacion/>}/>

        <Route path='/homeEstudiante' element={<HomeEstudiante/>}/>
        <Route path='/homeEstudiante/homeGrupoEstudiante' element={<HomeGrupoEstudiante/>}/>
        <Route path='/homeEstudiante/homeGrupoEstudiante/PlanificacionDeDesarollo/Empresa/:idEmpresa' element={<VerPlanficacionDeDesarollo/>}/>
        <Route path='/homeEstudiante/homeGrupoEstudiante/PlanificacionInicial/Empresa/:idEmpresa' element={<EditarPlanificacion/>}/>
    </Routes>
  );
}

export default Nav