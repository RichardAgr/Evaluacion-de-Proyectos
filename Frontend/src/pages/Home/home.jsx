import { Fragment } from "react";
import Footer from "../../components/Footer/footer.jsx";
import Header from "../../components/Header/header.jsx";
import { useNavigate } from "react-router-dom";
import { Container, Grid2, Button, Typography, Paper } from "@mui/material";

const ButtonGroup = ({ title, buttons }) => (
  <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
    <Typography variant="h5" gutterBottom>
      {title}
    </Typography>
    <Grid2 container spacing={2}>
      {buttons.map((button, index) => (
        <Grid2 item xs={12} sm={6} md={4} key={index}>
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
        </Grid2>
      ))}
    </Grid2>
  </Paper>
);

function Home() {
  const navigate = useNavigate();

  const teacherButtons = [
    {
      label: "Validar Planificaciones",
      onClick: () => navigate("/validarPlanificacion/"),
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
      onClick: () => navigate("/homeEstudiante/homeGrupoEstudiante/crearGrupo1"),
    },
    {
      label: "Grupos Disponibles",
      onClick: () => navigate("/homeEstudiante/gruposDisponibles"),
    },

    {
      label: "Modificar Tarea",
      onClick: () =>
        navigate("/homeEstudiante/homeGrupoEstudiante/sprint/semana/tareas/1"),
    },

  ];

  const sharedButtons = [
    {
      label: "Visualizar tareas",
      onClick: () => navigate("/homeEstudiante/homeGrupoEstudiante/sprint/1"),
    },
    {
      label: "Ver Calificaciones",
      onClick: () =>
        navigate(
          "/homeEstudiante/homeGrupoEstudiante/empresas/1/calificaciones"
        ),
    },
    {
      label: "Ver Nota Sprint",
      onClick: () =>
        navigate(
          "homeEstudiante/homeGrupoEstudiante/empresas/1/calificaciones"
        ),
    },
    {
      label: "Ver Planificación",
      onClick: () => navigate("/visualizarPlanificacion"),
    },
    {
      label: "Modificar Planificación",
      onClick: () => navigate("/modificarPlanificacion/empresa/1"),
    },
    {
      label: "Publicar Planificación",
      onClick: () => navigate("/publicarPlanificacion/empresa/1"),
    },
    {
      label: "Visualizar Sprint",
      onClick: () => navigate("/visualizarSprint/empresa/1"),
    },
    {
      label: "Visualizar est nota",
      onClick: () => navigate("/homeEstudiante/visCalificar"),
    },
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
        <ButtonGroup title="Acciones Compartidas" buttons={sharedButtons} />
      </Container>
      <Footer />
    </>
  );
}

export default Home;
