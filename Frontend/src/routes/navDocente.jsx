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
//import ListaVerPlanificacion from "../pages/Docente/listas/seleccionarEmpresaVisualizar/seleccionarEmpresaVisualizar.jsx";
import ListaEmpresaSprints from "../pages/Docente/calificarSprint/listaEmpresaSprints.jsx";

function Nav() {
    return (
      <Routes>
        {/** ROUTES JHON*/}
        <Route 
            path="/homeGrupo/:idGrupo/listaEmpresaCalificarSprints" 
            element={<ListaEmpresaSprints/>}
        />
        <Route 
            path="/homeGrupo/:idGrupo/listaEmpresaCalificarSprints/:idEmpresa" 
            element={<ListaSprints/>}
        />
        <Route 
            path="/homeGrupo/:idGrupo/listaEmpresaCalificarSprints/:idEmpresa/sprint/:idSprint" 
            element={<CalificarSprint/>}
        />
        <Route
          path="/homeGrupo/:idGrupo/listaEstudiantes/:gestionGrupo"//NO_NECESITAS_GESTION
          element={<ObtenerEstudiantesPorGrupo />}
        />
        <Route
          path="/homeGrupo/:idGrupo/listaEmpresas/:idDocente"//NO_NECESITAS_DOCENTE
          element={<EmpresasPorDocente />}
        />
        <Route
          path="/homeEstudiante/visCalificar"
          element={<CalificarEstSemana />}
        />
        {/** ROUTES JOAQUIN*/}
        {/** ROUTES JHAIR*/}
        <Route
          path="/visualizarPlanificacion"
          element={<SeleccionarEmpresaVisualizar />}
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
      </Routes>
    );
  }
  
  export default Nav;