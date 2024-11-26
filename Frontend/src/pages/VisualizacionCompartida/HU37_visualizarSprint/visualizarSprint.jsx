import { useState, useEffect } from "react";

import { styled } from "@mui/material/styles";
import { useParams, useNavigate } from "react-router-dom";
import { getSprintPorId } from "../../../api/visualizarSprint/visualizarSprint";
import {
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Box,
  Button,
  Link,
  Grid2,
  Divider,
  
  Checkbox,
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AssignmentIcon from "@mui/icons-material/Assignment";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import BaseUI from "../../../components/baseUI/baseUI";
const FileItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(4),
}));
const FileInfo = styled(Box)(({ theme }) => ({
  marginLeft: theme.spacing(2),
}));
function VisualizarSprint() {
  const [sprint, setSprint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({
    error: false,
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
          error: true,
          errorMessage: "Ha ocurrido un error",
          errorDetails: error.message,
        });
      }
      console.log(sprint);
    }

    fetchData();
  }, [idSprint]);

  const handleVerTareas = () => {
    navigate(`/1/homeGrupoE/1/empresas/${idEmpresa}`);
  };

  const selectIcon = (nombreArchivo, link) => {
    if (nombreArchivo === null) {
      return <DescriptionIcon></DescriptionIcon>;
    }
    const tipo = nombreArchivo.split(".")[1];
    console.log(tipo);
    if (tipo === "pdf") {
      return (
        <Link href={link} target="_blank" className="archivoLink">
          <PictureAsPdfIcon></PictureAsPdfIcon>
        </Link>
      );
    }
    if (tipo === "docx") {
      return (
        <Link href={link} target="_blank" className="archivoLink">
          <DescriptionIcon></DescriptionIcon>
        </Link>
      );
    }
    if (tipo === "zip") {
      return (
        <Link href={link} target="_blank" className="archivoLink">
          <FolderZipIcon></FolderZipIcon>
        </Link>
      );
    }
    if (tipo === "png" || tipo === "jpg") {
      return (
        <Link href={link} target="_blank" className="archivoLink">
          <PhotoIcon></PhotoIcon>
        </Link>
      );
    }
  };

  return (
    <BaseUI
      titulo={"VISUALIZAR SPRINT"}
      ocultarAtras={false}
      confirmarAtras={false}
      dirBack={`/visualizarSprint/empresa/${idEmpresa}`}
      loading={loading}
      error={error}
    >
      <Container>
      {!sprint ? (
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

          <Grid2 item xs={12}>
            <Box display="flex" alignItems="center">
              <MonetizationOnIcon sx={{ m: 2 }} />
              <Typography variant="body1">
                <strong>Cobro:</strong> {sprint.cobro}%
              </Typography>
            </Box>
          </Grid2>
          <Divider sx={{ my: 2 }} />

          <Grid2 container className="datosSprint">
            <Paper className="entregables">
              <Typography variant="h6">Entregables</Typography>
              {sprint.entregables.map((entregable, index) => (
                <Box key={index} className="entregableItem">
                  <Checkbox
                    sx={{
                      "&:hover": {
                        backgroundColor: "transparent", // Quita el fondo al hacer hover
                      },
                      transition: "none", // Desactiva la transición de animación
                      cursor: "default",
                    }}
                    checked={entregable.archivoEntregable !== null}
                  />
                  <Typography>{entregable.descripcionEntregable}</Typography>
                </Box>
              ))}
            </Paper>
            <Paper className="archivos">
              <Typography variant="h6" sx={{ mb: 2.3 }}>
                Archivos
              </Typography>
              {sprint.entregables.map((entregable, index) => (
                <FileItem key={index}>
                  {selectIcon(entregable.nombreArchivo)}
                  <FileInfo>
                    {entregable.archivoEntregable ? (
                      <Link
                        href={entregable.archivoEntregable}
                        target="_blank"
                        underline="hover"
                      >
                        {entregable.nombreArchivo}
                      </Link>
                    ) : (
                      <Typography variant="body2" color="textSecondary">
                        {entregable.descripcionEntregable}
                      </Typography>
                    )}
                    <Typography
                      variant="caption"
                      color={
                        entregable.archivoEntregable
                          ? "success.main"
                          : "error.main"
                      }
                      sx={{ mx: 2 }}
                    >
                      {entregable.archivoEntregable
                        ? "Entregado"
                        : "No entregado"}
                    </Typography>
                  </FileInfo>
                </FileItem>
              ))}
            </Paper>
          </Grid2>
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
      </Container>
    </BaseUI>
  );
}

export default VisualizarSprint;

const Container = styled("div")`
  padding: 1.5rem;
  .datosSprint {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }
  .titulo {
    margin-bottom: 1rem;
  }

  .entregables,
  .archivos {
    padding: 1rem;
    margin-top: 1rem;
    flex: 1;
    box-sizing: border-box;
  }

  .entregableItem,
  .archivoItem {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    margin-top: 1rem;
  }

  .archivoItem {
    margin-bottom: 0.6rem;
  }
`;