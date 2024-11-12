import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getSprintPorId,
  getListaSprintsPorIdEmpresa,
} from "../../../api/visualizarSprint/visualizarSprint";
import {
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Box,
  Button,
  Grid2,
  Divider,
  Chip,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AssignmentIcon from "@mui/icons-material/Assignment";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import BaseUI from "../../../components/baseUI/baseUI";
import Error from "../../../components/error/error";
import Loading from "../../../components/loading/loading";
function VisualizarSprint() {
  const [sprint, setSprint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({
    errorMessage: "",
    errorDetails: "",
  });

  const { idEmpresa, idSprint } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const sprintData = await getSprintPorId(idSprint);
        setSprint(sprintData);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener datos:", error);
        setError({
          errorMessage: "Ha ocurrido un error",
          errorDetails: error.message,
        });
        setLoading(false);
      }
    }

    fetchData();
  }, [idSprint]);

  const handleVerTareas = () => {
    navigate(`/visualizarPlanificacion`);
  };

  return (
    <BaseUI
      titulo={"VISUALIZAR SPRINT"}
      ocultarAtras={false}
      confirmarAtras={false}
      dirBack={`/visualizarSprint/empresa/${idEmpresa}`}
    >
      {error.errorMessage || error.errorDetails ? (
        <Error
          errorMessage={error.errorMessage}
          errorDetails={error.errorDetails}
        />
      ) : loading ? (
        <Loading />
      ) : !sprint ? (
        <Typography align="center">
          No se encontró información para este sprint.
        </Typography>
      ) : (
        <Paper elevation={3} sx={{ padding: 3, my: 3 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
            SPRINT {sprint.numeroSprint}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Grid2 container spacing={2}>
            <Grid2 item xs={12} sm={6}>
              <Box
                display="flex"
                alignItems="center"
                flexDirection={{ xs: "column", sm: "row" }}
                justifyContent="space-between"
              >
                <Grid2 item xs={12} sm={4}>
                  <Box display="flex" alignItems="center" m={2}>
                    <CalendarTodayIcon sx={{ mr: 1 }} />
                    <Typography variant="body1">
                      <strong>Fecha de Inicio:</strong>{" "}
                      {new Date(sprint.fechaIni).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Grid2>
                <Grid2 item xs={12} sm={4}>
                  <Box display="flex" alignItems="center" m={2}>
                    <CalendarTodayIcon sx={{ mr: 1 }} />
                    <Typography variant="body1">
                      <strong>Fecha de Fin:</strong>{" "}
                      {new Date(sprint.fechaFin).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Grid2>
                <Grid2 item xs={12} sm={4}>
                  <Box display="flex" alignItems="center">
                    <CalendarTodayIcon sx={{ m: 2 }} />
                    <Typography variant="body1">
                      <strong>Fecha de Entrega:</strong>{" "}
                      {new Date(sprint.fechaEntrega).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Grid2>
              </Box>
            </Grid2>
          </Grid2>

          <Grid2 item xs={12} >
            <Box display="flex" alignItems="center">
              <MonetizationOnIcon sx={{ m: 2 }} />
              <Typography variant="body1">
                <strong>Cobro:</strong> {sprint.cobro}%
              </Typography>
            </Box>
          </Grid2>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" sx={{ mb: 2 }}>
            <AssignmentIcon sx={{ verticalAlign: "middle", mr: 1 }} />
            Entregables de la Planificacion:
          </Typography>
          <List sx={{ bgcolor: "background.paper", borderRadius: 1 }}>
            {sprint.entregables.map((entregable) => (
              <ListItem key={entregable.idEntregables}>
                <ListItemText
                  primary={entregable.descripcionEntregable}
                  primaryTypographyProps={{ fontWeight: "medium" }}
                />
              </ListItem>
            ))}
          </List>
          <Box sx={{ mt: 3, display: "flex", justifyContent: "left" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleVerTareas}
              sx={{
                fontWeight: "bold",
                px: 4,
                py: 1,
                borderRadius: 2,
                boxShadow: 2,
                "&:hover": {
                  boxShadow: 4,
                },
              }}
            >
              Ver Tareas
            </Button>
          </Box>
        </Paper>
      )}
    </BaseUI>
  );
}

export default VisualizarSprint;
