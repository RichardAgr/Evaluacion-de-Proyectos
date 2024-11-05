import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  List,
  ListItem,
  Button,
  Box,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import BaseUI from "../../../../components/baseUI/baseUI.jsx";
import CuadroDialogo from "../../../../components/cuadroDialogo/cuadroDialogo.jsx";
import DecisionButtons from "../../../../components/Buttons/decisionButtons.jsx";
import InfoSnackbar from "../../../../components/infoSnackbar/infoSnackbar.jsx";
import {
  getTareasSemana,
  updateTareasSemana,
} from "../../../../api/validarTareas/tareas.jsx";
import Loading from "../../../../components/loading/loading.jsx";

export default function ModificarListaTareas() {
  const { idEmpresa, idSprint, idSemana } = useParams();
  const [tasks, setTasks] = useState([]);
  const [numSemana, setNumSemana] = useState(0);
  const [numSprint, setNumSprint] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const [cuadroDialogo, setCuadroDialogo] = useState({
    open: false,
    onConfirm: () => {},
    title: "",
    description: "",
  });

  const fetchTasks = async () => {
    try {
      const tareas = await getTareasSemana(idEmpresa, idSprint, idSemana);
      setNumSemana(tareas.numeroSemana);
      setNumSprint(tareas.numeroSprint);
      setTasks(tareas.tareas);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError("Error al obtener las tareas de la semana");
      setSnackbar({
        open: true,
        message: "Error al cargar las tareas",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = () => {
    setTasks([...tasks, { idTarea: null, nombreTarea: "Nueva tarea" }]);
  };

  const handleDeleteTask = (idTarea) => {
    setCuadroDialogo({
      open: true,
      title: "Eliminar tarea",
      description: "¿Está seguro de que desea eliminar esta tarea?",
      onConfirm: () => {
        setTasks(
          tasks.map((task) =>
            task.idTarea === idTarea ? { ...task, deleted: true } : task
          )
        );
        setCuadroDialogo({ ...cuadroDialogo, open: false });
      },
    });
  };

  const handleEditTask = (idTarea, newName) => {
    setTasks(
      tasks.map((task) =>
        task.idTarea === idTarea ? { ...task, nombreTarea: newName } : task
      )
    );
  };

  const handleReject = () => {
    setCuadroDialogo({
      open: true,
      title: "Descartar cambios",
      description: "¿Estás seguro de que deseas descartar los cambios?",
      onConfirm: () => window.location.reload(),
    });
  };

  const handleSave = () => {
    setCuadroDialogo({
      open: true,
      title: "Guardar cambios",
      description:
        "¿Está seguro de que desea guardar los cambios en la lista de tareas?",
      onConfirm: handleConfirmSave,
    });
  };

  const handleConfirmSave = async () => {
    try {
      const result = await updateTareasSemana(
        idEmpresa,
        idSprint,
        idSemana,
        tasks
      );
      setSnackbar({ open: true, message: result.message, severity: "success" });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Error al guardar las tareas",
        severity: "error",
      });
    }
    setCuadroDialogo({ ...cuadroDialogo, open: false });
  };

  return (
    <BaseUI
      titulo="MODIFICAR LISTA SEMANAL DE TAREAS"
      ocultarAtras={false}
      confirmarAtras={false}
      dirBack="/"
    >
      {error ? (
        <p>Error: {error}</p>
      ) : loading ? (
        <Loading />
      ) : (
        <Container maxWidth="md" sx={{ mt: 4, px: { xs: 2, sm: 3 } }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            align="center"
            sx={{ fontWeight: "bold" }}
          >
            SPRINT {numSprint}
          </Typography>
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            align="center"
            sx={{ mb: 3 }}
          >
            SEMANA {numSemana}
          </Typography>
          {tasks.length === 0 ? (
            <Typography variant="h4" align="center" sx={{ mb: 5.4, mt: 6 }}>
              No hay tareas aún
            </Typography>
          ) : (
            <List
              sx={{
                width: "100%",
                bgcolor: "background.paper",
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              {tasks.map(
                (task) =>
                  !task.deleted && (
                    <ListItem
                      key={task.idTarea}
                      sx={{ bgcolor: "#CFD4E1", mb: 1, py: 2, px: 3 }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          flexGrow: 1,
                        }}
                      >
                        <TextField
                          value={task.nombreTarea}
                          onChange={(e) =>
                            handleEditTask(task.idTarea, e.target.value)
                          }
                          variant="standard"
                          fullWidth
                          InputProps={{
                            disableUnderline: true,
                            style: {
                              fontSize: "1.25rem",
                              fontWeight: "medium",
                            },
                          }}
                        />
                      </Box>
                      <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDeleteTask(task.idTarea)}
                        sx={{ ml: 2 }}
                      >
                        Eliminar
                      </Button>
                    </ListItem>
                  )
              )}
            </List>
          )}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3, mb: 2 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleAddTask}
            >
              Añadir tarea
            </Button>
          </Box>
          <DecisionButtons
            rejectButtonText="Descartar"
            validateButtonText="Guardar cambios"
            onReject={handleReject}
            onValidate={handleSave}
            disabledButton={0}
          />
          <CuadroDialogo
            open={cuadroDialogo.open}
            onClose={() => setCuadroDialogo({ ...cuadroDialogo, open: false })}
            title={cuadroDialogo.title}
            description={cuadroDialogo.description}
            onConfirm={cuadroDialogo.onConfirm}
          />
          <InfoSnackbar
            openSnackbar={snackbar.open}
            setOpenSnackbar={(open) => setSnackbar({ ...snackbar, open })}
            message={snackbar.message}
            severity={snackbar.severity}
          />
        </Container>
      )}
    </BaseUI>
  );
}
