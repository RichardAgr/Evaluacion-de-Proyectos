import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../../pages/Home/home.jsx";

import HomeDocente from "../../pages/Docente/homeDocente/homeDocente.jsx";
import HomeGrupoDocente from "../../pages/Docente/homeGrupoDocente/homeGrupoDocente.jsx";
import VerPlanificacionDeDesarolloD from "../../pages/Docente/verPlanificacionDeDesarolloEmpresa/VerPlanificacionDeDesarolloD.jsx";
import ValidarPlanificacion from "../../pages/Docente/validarPlanificacion/validarPlanificacion.jsx";
import ListarEmpresas from "../../pages/Docente/listaEmpresas/listaEmpresas.jsx";

import HomeEstudiante from "../../pages/Estudiante/homeEstudiante/homeEstudiante.jsx";
import HomeGrupoEstudiante from "../../pages/Estudiante/homeGrupoEstudiante/homeGrupoEstudiante.jsx";
import VerPlanficacionDeDesarollo from "../../pages/Estudiante/verPlanificacionDeDesarollo/VerPlanifacionDeDesarolloE.jsx";
import EditarPlanificacion from "../../pages/Estudiante/editarPlanificacion/editarPlanificacion.jsx";
function nav() {
  return (
    <Routes>
      {/* Ruta para manejar rutas no encontradas */}
      <Route path="*" element={<Navigate to="/" />} />
      
      <Route path="/" element={<Home />} />
      {/* Rutas para el docente */}
      <Route path="/homeDocente" element={<HomeDocente />} />
      <Route
        path="/homeDocente/homeGrupoDocente"
        element={<HomeGrupoDocente />}
      />
      <Route
        path="/homeDocente/homeGrupoDocente/Empresa/:idEmpresa/PlanificacionDeDesarollo"
        element={<VerPlanificacionDeDesarolloD />}
      />
      <Route
        path="/homeDocente/homeGrupoDocente/Empresa/ValidarPlanificacion/:idEmpresa"
        element={<ValidarPlanificacion />}
      />
      <Route
        path="/homeDocente/homeGrupoDocente/ListaEmpresas"
        element={<ListarEmpresas />}
      />
      {/* Rutas para el Estudiante */}
      <Route path="/homeEstudiante" element={<HomeEstudiante />} />
      <Route
        path="/homeEstudiante/homeGrupoEstudiante"
        element={<HomeGrupoEstudiante />}
      />
      <Route
        path="/homeEstudiante/homeGrupoEstudiante/Empresa/:idEmpresa/PlanificacionDeDesarollo"
        element={<VerPlanficacionDeDesarollo />}
      />
      <Route
        path="/homeEstudiante/homeGrupoEstudiante/Empresa/:idEmpresa/PlanificacionInicial"
        element={<EditarPlanificacion />}
      />
    </Routes>
  );
}

export default nav;
