import { Routes, Route } from "react-router-dom";
import HomeDocente from "../pages/Docente/homeDocente/homeDocente.jsx";
import HomeGrupoDocente from "../pages/Docente/homeGrupoDocente/homeGrupoDocente.jsx";
import EvaluacionSemanal from "../pages/Docente/evaluacionSemanal/evaluacionSemanal.jsx";
import CalificarEstSemana from "../pages/Docente/HU7_calificarEstudiante/calificarEstSemana.jsx";
import CalificarSprint from "../pages/Docente/HU34_calificarSprint/calificarSprintU.jsx";
import ListaSprints from "../pages/Docente/HU34_calificarSprint/listaSprints.jsx";
import ObtenerEstudiantesPorGrupo from "../pages/Docente/HU32_listaEstudiantes/listaEstudiantes.jsx";
import EmpresasPorDocente from "../pages/Docente/HU31_listaEmpresas/listaEmpresaPorDocente.jsx";
import SeleccionarEmpresaVisualizar from "../pages/Docente/listas/seleccionarEmpresaVisualizar/seleccionarEmpresaVisualizar.jsx";
import SeleccionarEmpresaModificar from "../pages/Docente/listas/seleccionarEmpresaModificar/seleccionarEmpresaModificar.jsx";
import SeleccionarEmpresaPublicar from "../pages/Docente/listas/seleccionarEmpresaPublicar/seleccionarEmpresaPublicar.jsx";
import SeleccionarEmpresaVerSprints from "../pages/Docente/listas/seleccionarEmpresaVerSprints/seleccionarEmpresaVerSprints.jsx";
import SeleccionarEmpresaSinValidar from "../pages/Docente/listas/seleccionarEmpresaSinValidar/seleccionarEmpresaSinValidar.jsx";
import ValidarPlanificacion from "../pages/Docente/validarPlanificacion/validarPlanificacion.jsx";
//import ListaVerPlanificacion from "../pages/Docente/listas/seleccionarEmpresaVisualizar/seleccionarEmpresaVisualizar.jsx";
import ListaEmpresaSprints from "../pages/Docente/HU34_calificarSprint/listaEmpresaSprints.jsx";

function Nav() {
  return (
    <Routes>
      {/** ROUTES JHON*/}
      <Route
        path="/homeGrupo/:idGrupo/listaEmpresaCalificarSprints"
        element={<ListaEmpresaSprints />}
      />
      <Route
        path="/homeGrupo/:idGrupo/listaEmpresaCalificarSprints/:idEmpresa"
        element={<ListaSprints />}
      />
      <Route
        path="/homeGrupo/:idGrupo/listaEmpresaCalificarSprints/:idEmpresa/sprint/:idSprint"
        element={<CalificarSprint />}
      />
      <Route
        path="/homeGrupo/:idGrupo/listaEstudiantes/:gestionGrupo" //NO_NECESITAS_GESTION
        element={<ObtenerEstudiantesPorGrupo />}
      />
      <Route
        path="/homeGrupo/:idGrupo/listaEmpresas/:idDocente" //NO_NECESITAS_DOCENTE
        element={<EmpresasPorDocente />}
      />
      <Route
        path="/homeEstudiante/visCalificar"
        element={<CalificarEstSemana />}
      />
      {/** ROUTES JOAQUIN*/}
      {/** ROUTES JHAIR*/}

      {/** Seleccionar una planificacion para visualizar*/}
      <Route
        path="/visualizarPlanificacion"
        element={<SeleccionarEmpresaVisualizar />}
      />

      {/** Seleccione una Planificacion para Modificar */}
      <Route
        path="/modificarPlanificacion/"
        element={<SeleccionarEmpresaModificar />}
      />

      {/** Seleccione una Planificacion para Publicar */}
      <Route
        path="/publicarPlanificacion/"
        element={<SeleccionarEmpresaPublicar />}
      />

      {/** Seleccione una empresa para ver sus sprints*/}

      <Route
        path="/visualizarSprint/"
        element={<SeleccionarEmpresaVerSprints />}
      />

      {/** Seleccionar una planificacion para validar*/}
      <Route
        path="/validarPlanificacion/"
        element={<SeleccionarEmpresaSinValidar />}
      />

      {/** Validar Planificacion */}
      <Route
        path="/validarPlanificacion/empresa/:idEmpresa"
        element={<ValidarPlanificacion />}
      />

      <Route path="/homeDocente" element={<HomeDocente />} />
      <Route
        path="/homeDocente/homeGrupoDocente"
        element={<HomeGrupoDocente />}
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
