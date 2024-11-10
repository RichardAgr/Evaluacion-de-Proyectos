import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/home.jsx";
import VerPlanificacionDeDesarollo from "../pages/VisualizacionCompartida/verPlanificacionDeDesarollo/VerPlanifacionDeDesarollo.jsx";
import VisualizarSprint from "../pages/VisualizacionCompartida/visualizarSprint/visualizarSprint.jsx";
import SeleccionarSprintVisualizar from "../pages/Docente/listas/seleccionarSprintVisualizar/seleccionarSprintVisualizar.jsx";

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
      </Routes>
    );
  }
  
  export default Nav;