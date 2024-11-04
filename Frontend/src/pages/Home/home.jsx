import { Fragment } from "react";
import Footer from "../../components/Footer/footer.jsx";
import Header from "../../components/Header/header.jsx";
import { useNavigate } from "react-router-dom";
import { Container, Grid, Button, Typography, Paper } from "@mui/material";

const ButtonGroup = ({ title, buttons }) => (
  <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
    <Typography variant="h5" gutterBottom>
      {title}
    </Typography>
    <Grid container spacing={2}>
      {buttons.map((button, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={button.onClick}
            sx={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            {button.label}
          </Button>
        </Grid>
      ))}
    </Grid>
  </Paper>
);

function Home() {
  const navigate = useNavigate();

  const teacherButtons = [
    {
      label: "Ver Planificación",
      onClick: () => navigate("/visualizarPlanificacion"),
    },
    {
      label: "Modificar Planificación",
      onClick: () => navigate("/modificarPlanificacion/empresa/1"),
    },
    {
      label: "Validar Planificaciones",
      onClick: () => navigate("/validarPlanificacion/"),
    },
    {
      label: "Publicar Planificación",
      onClick: () => navigate("/publicarPlanificacion/empresa/1"),
    },
    {
      label: "Calificar Sprint",
      onClick: () => navigate("/calificarSprint/empresa/1/sprint/1/"),
    },
    {
      label: "Modificar Lista de Tareas",
      onClick: () =>
        navigate("/modificarListaTareas/empresa/1/sprint/1/semana/1"),
    },
    {
      label: "Lista Empresas",
      onClick: () => navigate("/homeGrupoDocente/listaEmpresas/1"),
    },
    {
      label: "Lista Estudiantes",
      onClick: () => navigate("/homeGrupoDocente/listaEstudiantes/1/2024-2"),
    },
    {
      label: "Visualizar Notas Estudiantes",
      onClick: () => navigate("/homeDcoente/visCalificar"),
    },
  ];

  const studentButtons = [
    {
      label: "Crear Empresa",
      onClick: () => navigate("/homeEstudiante/homeGrupoEstudiante/crearGrupo"),
    },
    {
      label: "Grupos Disponibles",
      onClick: () => navigate("/homeEstudiante/gruposDisponibles"),
    },
    {
      label: "Ver Nota Sprint",
      onClick: () =>
        navigate(
          "homeEstudiante/homeGrupoEstudiante/empresas/1/calificaciones"
        ),
    },
    {
      label: "Modificar Tarea",
      onClick: () =>
        navigate("/homeEstudiante/homeGrupoEstudiante/sprint/semana/tareas/1"),
    },
    {
      label: "Ver Calificaciones",
      onClick: () =>
        navigate(
          "/homeEstudiante/homeGrupoEstudiante/empresas/1/calificaciones"
        ),
    },
    {
      label: "Visualizar Sprint",
      onClick: () => navigate("/homeEstudiante/homeGrupoEstudiante/sprint/1"),
    },
  ];

  const sharedButtons = [


  ];



  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Panel de Control
        </Typography>
        <ButtonGroup title="Acciones del Docente" buttons={teacherButtons} />
        <ButtonGroup title="Acciones del Estudiante" buttons={studentButtons} />
      </Container>
      <Footer />
    </>
  );
}

export default Home;
