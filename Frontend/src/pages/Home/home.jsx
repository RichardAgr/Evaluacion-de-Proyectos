import { Fragment } from "react";
import Footer from "../../components/Footer/footer.jsx";
import Header from "../../components/Header/header.jsx";

import { useNavigate } from "react-router-dom";
import { Button, Grid2  } from "@mui/material";



function Home() {
  const navigate = useNavigate();

  const handleNavigateToVerPlanificacion = () => {
    navigate("/visualizarPlanificacion");
  };
  const handleNavigateToModificarPlanificacion = () => {
    navigate("/modificarPlanificacion/empresa/1");
  };
  const handleNavigateToPublicarPlanificacion = () => {
    navigate("/publicarPlanificacion/empresa/1");
  };
  const handleNavigateToValidarEmpresas = () => {
    navigate("/validarPlanificacion/");
  };
  const handleNavigateToEvaluacionSemanal = () => {
    navigate("/evaluacionSemanal/empresa/1/sprint/1/");
  };
  const handleNavigateToModificarLista = () => {
    navigate("/modificarListaTareas/empresa/1/sprint/1/semana/1");
  };
  const handleNavigateToEmpresasLista = () => {
    navigate("/homeGrupoDocente/listaEmpresas/1");
  };

  const handleNavigateToListaEstudiantes = () => {
    navigate("/homeGrupoDocente/listaEstudiantes/1/2024-2");
  };

  const handleNavigateToCrearEmpresa = () => {
    navigate("/homeEstudiante/homeGrupoEstudiante/crearGrupo1");
  };

  const handleNavigateToGruposDisponibles = () => {
    navigate("/homeEstudiante/gruposDisponibles");
  };

  const handleNavigateToModificarTarea = () => {
    navigate( '/homeEstudiante/homeGrupoEstudiante/sprintE/1');
  };

  const handleNavigateCalificacionesHito = () => {
    navigate("/homeEstudiante/homeGrupoEstudiante/empresas/1/calificaciones");
  };

  const handleNavigateVisualizarSprint = () => {
    navigate("/homeEstudiante/homeGrupoEstudiante/sprint/1");
  };
  const handleNavigateResultadosAlumnos = () => {
    navigate("/homeEstudiante/visCalificar");
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
          onClick={handleNavigateToModificarPlanificacion}
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
          Ir a Validar planificaciones
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleNavigateToPublicarPlanificacion}
          style={{
            padding: "15px 30px",
            fontSize: "1.2rem",
            margin: "10px",
          }}
        >
          Ir a publicar planificacion
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
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleNavigateToModificarTarea}
          style={{
            padding: "15px 30px",
            fontSize: "1.2rem",
            margin: "10px",
          }}
        >
          Modificar tarea
        </Button>
      </div>
      <Grid2 container spacing={1} style={{ marginTop: '20px' }}>
      <Grid2 item xs={12} sm={6} md={4}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleNavigateToEmpresasLista}
        >
          Ir a Lista Empresas
        </Button>
      </Grid2>
      <Grid2 item xs={12} sm={6} md={4}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleNavigateToListaEstudiantes}
        >
          Lista Estudiantes
        </Button>
      </Grid2>
      <Grid2 item xs={12} sm={6} md={4}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleNavigateToCrearEmpresa}
        >
          Ir a Crear Empresa
        </Button>
      </Grid2>
      <Grid2 item xs={12} sm={6} md={4}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleNavigateVisualizarSprint}
        >
          Visualizar Sprint Prueba
        </Button>
      </Grid2>
      <Grid2 item xs={12} sm={6} md={4}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleNavigateResultadosAlumnos}
        >
          Visualizar Est Nota
        </Button>
      </Grid2>
      <Grid2 item xs={12} sm={6} md={4}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleNavigateToGruposDisponibles}
        >
          Ir a Grupos Disponibles
        </Button>
      </Grid2>
      <Grid2 item xs={12} sm={6} md={4}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleNavigateCalificacionesHito}
        >
          Ir a Ver Calificaciones
        </Button>
      </Grid2>
    </Grid2>
      <Footer />
    </Fragment>
  );
}

export default Home;
