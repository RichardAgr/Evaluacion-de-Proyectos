import { Fragment } from "react";
import Footer from "../../components/Footer/footer.jsx";
import Header from "../../components/Header/header.jsx";

import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

function Home() {
  const navigate = useNavigate();

  const handleNavigateToVerPlanificacion = () => {
    navigate("/seleccionarVisualizarEmpresa");
  };
  const handleNavigateToEditarPlanificacion = () => {
    navigate(
      "/homeEstudiante/homeGrupoEstudiante/PlanificacionInicial/Empresa/1"
    );
  };
  const handleNavigateToValidarEmpresas = () => {
    navigate("/validarPlanificacion/");
  };
  const handleNavigateToEvaluacionSemanal = () => {
    navigate("/evaluacionSemanal/empresa/1/sprint/1/");
  };
  const handleNavigateToModificarLista = () => {
    navigate("/empresa/1/sprint/1/semana/1/modificarListaTareas");
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
          Ir a Modificar Planificacion
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
          onClick={handleNavigateToEvaluacionSemanal}
          style={{
            padding: "15px 30px",
            fontSize: "1.2rem",
            margin: "10px", 
          }}
        >
          Ir a Evaluacion Semanal
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
      <Footer />
    </Fragment>
  );
}

export default Home;
