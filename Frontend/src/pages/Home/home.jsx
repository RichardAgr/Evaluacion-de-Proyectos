import { Fragment } from "react";
import Footer from "../../components/Footer/footer.jsx";
import Header from "../../components/Header/header.jsx";

import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

function Home() {
  const navigate = useNavigate();

  const handleNavigateToVerPlanificacion = () => {
    navigate("/homeDocente/homeGrupoDocente/verPlanificacionDeEmpresas");
  };
  const handleNavigateToEditarPlanificacion = () => {
    navigate(
      "/homeEstudiante/homeGrupoEstudiante/PlanificacionInicial/Empresa/1"
    );
  };
  const handleNavigateToValidarEmpresas = () => {
    navigate("/grupoDocente/validarPlanificacion/");
  };
  const handleNavigateToCalificarSprint = () => {
    navigate("/grupoDocente/empresa/1/planificacion/calificarSprint/1");
  };
  const handleNavigateToModificarLista = () => {
    navigate("/grupoEstudiante/sprint/semana/1/modificarListaTareas");
  };
  const handleNavigateToEmpresasLista = () => {
    navigate( '/homeGrupoDocente/listaEmpresas/1');
  };

  const handleNavigateToListaEstudiantes = () => {
    navigate( '/homeGrupoDocente/listaEstudiantes/1/2024-2');
  };
  const handleNavigateToListaEstudiantesA = () => {
    navigate( '/homeGrupoDocente/listaEstudiantesA/1/2024-2');
  };

  const handleNavigateToCrearEmpresa = () => {
    navigate( '/homeEstudiante/homeGrupoEstudiante/crearGrupo');
  };

  const handleNavigateToGruposDisponibles = () => {
    navigate( '/homeEstudiante/gruposDisponibles');
  };

 
  
  return (
    <Fragment>
      <Header />
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 200px)", // Adjust this value based on your header and footer height
          
        }}
      >
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleNavigateToVerPlanificacion}
          style={{
            padding: "15px 30px",
            fontSize: "1.2rem",
            margin: "10px", 
          }}
        >
          Ir a Ver Planificacion
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleNavigateToEditarPlanificacion}
          style={{
            padding: "15px 30px",
            fontSize: "1.2rem",
            margin: "10px", 
          }}
        >
          Ir a Editar Planificacion
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleNavigateToValidarEmpresas}
          style={{
            padding: "15px 30px",
            fontSize: "1.2rem",
            margin: "10px", 
          }}
        >
          Ir a Validar Empresas
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleNavigateToCalificarSprint}
          style={{
            padding: "15px 30px",
            fontSize: "1.2rem",
            margin: "10px", 
          }}
        >
          Ir a Calificar Sprint
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleNavigateToModificarLista}
          style={{
            padding: "15px 30px",
            fontSize: "1.2rem",
            margin: "10px", 
          }}
        >
          Ir a Modificar Lista de Tareas
        </Button>
      </div>
      <div>
      <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleNavigateToEmpresasLista}
          style={{
            padding: "15px 30px",
            fontSize: "10px",
            margin: "10px",
            marginTop: "-20em" 
          }}
        >
          Ir a Lista Empresas
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleNavigateToListaEstudiantes}
          style={{
            padding: "15px 30px",
            fontSize: "10px",
            margin: "10px",
            marginTop: "-20em"  
          }}
        >
          Ir a Lista Estudiantes
        </Button>
        
      <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleNavigateToListaEstudiantesA}
          style={{
            padding: "15px 30px",
            fontSize: "10px",
            margin: "10px",
            marginTop: "-20em" 
          }}
        >
          Ir a Lista Estudiantes Automatico
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleNavigateToCrearEmpresa}
          style={{
            padding: "15px 30px",
            fontSize: "10px",
            margin: "10px",
            marginTop: "-20em" 
          }}
        >
          Ir a Crear Empresa
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleNavigateToGruposDisponibles}
          style={{
            padding: "15px 30px",
            fontSize: "10px",
            margin: "10px",
            marginTop: "-20em" 
          }}
        >
          Ir a Grupos Disponibles
        </Button>
      </div>
      <Footer />
    </Fragment>
  );
}

export default Home;
