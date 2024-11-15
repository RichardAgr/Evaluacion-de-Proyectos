import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/home.jsx";
import VerPlanificacionDeDesarollo from "../pages/VisualizacionCompartida/HU36_verPlanificacionDeDesarollo/VerPlanifacionDeDesarollo.jsx";
import SeleccionarSprintVisualizar from "../pages/VisualizacionCompartida/HU37_visualizarSprint/seleccionarSprintVisualizar/seleccionarSprintVisualizar.jsx";
import VisualizarSprint from "../pages/VisualizacionCompartida/HU37_visualizarSprint/visualizarSprint.jsx";
import ModificarPlanificacion from "../pages/Estudiante/HU4_editarPlanificacion/editarPlanificacion.jsx";
import PublicarPlanificacion from "../pages/Estudiante/publicarPlanificacion/publicarPlanificacion.jsx";

function Nav() {
  return (
    <Routes>
      {/** Ruta compartidas*/}
      <Route path="/" element={<Home />} />

      {/** Visualizar Planificacion*/}
      <Route
        path="/visualizarPlanificacion/Empresa/:idEmpresa"
        element={<VerPlanificacionDeDesarollo />}
      />
      {/** Seleccione un Sprint para  visualizar*/}
      <Route
        path="/visualizarSprint/Empresa/:idEmpresa"
        element={<SeleccionarSprintVisualizar />}
      />
      {/** Visualizar Sprint*/}
      <Route
        path="/visualizarSprint/Empresa/:idEmpresa/Sprint/:idSprint"
        element={<VisualizarSprint />}
      />

      {/** Modificar Planificacion */}
      <Route
        path="/modificarPlanificacion/Empresa/:idEmpresa"
        element={<ModificarPlanificacion />}
      />

      {/** Publicar Planificacion */}
      <Route
        path="/publicarPlanificacion/Empresa/:idEmpresa"
        element={<PublicarPlanificacion />}
      />

    </Routes>
  );
}

export default Nav;
