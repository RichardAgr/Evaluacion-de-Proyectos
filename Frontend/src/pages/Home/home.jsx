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
      label: "Seguimiento Semanal",
      onClick: () => navigate("/evaluacionSemanal/empresa/1/sprint/1"),
    },
    {
      label: "Calificar Sprints",
      onClick: () => navigate("/homeGrupo/1/listaEmpresaCalificarSprints"),
    },
    {
      label: "Modificar Lista de Tareas",
      onClick: () =>
        navigate("/modificarListaTareas/empresa/1/sprint/2/semana/2"),
    },
    {
      label: "Lista Empresas",
      onClick: () => navigate("/homeGrupo/1/listaEmpresas/1"),
    },
    {
      label: "Lista Estudiantes",
      onClick: () => navigate("/homeGrupo/1/listaEstudiantes/2024-2"),
    },
  ];

  const studentButtons = [
    {
      label: "Registrar Empresa",
      onClick: () => navigate("/homeEstudiante/homeGrupoEstudiante/crearGrupo/25"),
    },
    {
      label: "Modificar Empresa",
      onClick: () => navigate("/homeEstudiante/homeGrupoEstudiante/modificarGrupo/25"),
    },    {
      label: "Publicar Empresa",
      onClick: () => navigate("/homeEstudiante/homeGrupoEstudiante/publicarEmpresa/25"),
    },

    {
      label: "Grupos Disponibles",
      onClick: () => navigate("/homeEstudiante/gruposDisponibles"),
    },

    {
      label: "ID8-->Modificar Tarea",
      onClick: () =>
        navigate("/1/homeGrupoE/1/sprintE/3"),
    },

  ];

  const sharedButtons = [
    {
      label: "Visualizar tareas",
      onClick: () => navigate(`/1/homeGrupoE/1/empresaTareas`),
    },
    {
      label: "Ver Calificaciones",
      onClick: () =>
        navigate(
          "/1/homeGrupoE/1/empresa/calificaciones"
        ),
    },
    {
      label: "Ver Planificación",
      onClick: () => navigate("/visualizarPlanificacion"),
    },
    {
      label: "Modificar Planificación",
      onClick: () => navigate("/modificarPlanificacion/"),
    },
    {
      label: "Publicar Planificación",
      onClick: () => navigate("/publicarPlanificacion/"),
    },
    {
      label: "Visualizar Sprint",
      onClick: () => navigate("/visualizarSprint/"),
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
