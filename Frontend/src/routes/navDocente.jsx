import { Routes, Route} from "react-router-dom";
import HomeDocente from "../pages/Docente/homeDocente/homeDocente.jsx";
import HomeGrupoDocente from "../pages/Docente/homeGrupoDocente/homeGrupoDocente.jsx";
import SeleccionarEmpresaSinValidar from "../pages/Docente/listas/seleccionarEmpresaSinValidar/seleccionarEmpresaSinValidar.jsx";
import ValidarPlanificacion from "../pages/Docente/validarPlanificacion/validarPlanificacion.jsx";
import EvaluacionSemanal from "../pages/Docente/evaluacionSemanal/evaluacionSemanal.jsx";
import CalificarEstSemana from "../pages/Docente/calificarSprint/calificarEstudiante/calificarEstSemana.jsx";
import CalificarSprint from "../pages/Docente/calificarSprint/calificarSprintU.jsx";
import ListaSprints from "../pages/Docente/calificarSprint/listaSprints.jsx";
import ObtenerEstudiantesPorGrupo from "../pages/Docente/listas/listaEstudiantes/listaEstudiantes.jsx";
import EmpresasPorDocente from "../pages/Docente/listas/listaEmpresas/listaEmpresaPorDocente.jsx";
import SeleccionarEmpresaVisualizar from "../pages/Docente/listas/seleccionarEmpresaVisualizar/seleccionarEmpresaVisualizar.jsx";
import ListaVerPlanificacion from "../pages/Docente/listas/seleccionarEmpresaVisualizar/seleccionarEmpresaVisualizar.jsx";

function Nav() {
    return (
      <Routes>
        <Route
          path="/visualizarPlanificacion"
          element={<SeleccionarEmpresaVisualizar />}
        />
        <Route 
            path="/:idEmpresa/calificarSprints" 
            element={<ListaSprints/>}
        />
        <Route 
            path="/:idEmpresa/calificarSprints/sprint/:idSprint" 
            element={<CalificarSprint/>}
        />
        <Route 
            path="/homeDocente" 
            element={<HomeDocente />} 
        />
        <Route
          path="/homeDocente/homeGrupoDocente"
          element={<HomeGrupoDocente />}
        />
        <Route
          path="/validarPlanificacion/"
          element={<SeleccionarEmpresaSinValidar />}
        />
        <Route
          path="/validarPlanificacion/empresa/:idEmpresa"
          element={<ValidarPlanificacion />}
        />
        <Route
          path="/evaluacionSemanal/empresa/:idEmpresa/sprint/:idSprint"
          element={<EvaluacionSemanal />}
        />
        <Route
          path="/homeGrupoDocente/listaEstudiantes/:idGrupo/:gestionGrupo"
          element={<ObtenerEstudiantesPorGrupo />}
        />
        <Route
          path="/homeGrupoDocente/listaEmpresas/:idDocente"
          element={<EmpresasPorDocente />}
        />
        <Route
          path="/homeEstudiante/visCalificar"
          element={<CalificarEstSemana />}
        />
      </Routes>
    );
  }
  
  export default Nav;