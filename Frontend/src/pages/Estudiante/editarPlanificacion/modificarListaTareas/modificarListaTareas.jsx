import React, { useState } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
  Avatar,
  AvatarGroup,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import BaseUI from "../../../../components/baseUI/baseUI.jsx";
import CuadroDialogo from "../../../../components/cuadroDialogo/cuadroDialogo.jsx";
import DecisionButtons from "../../../../components/Buttons/decisionButtons.jsx";
import InfoSnackbar from "../../../../components/infoSnackbar/infoSnackbar.jsx";

// Simulated API function
const api = {
  saveTasks: async (tasks) => {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
    console.log("Sending data to API:", tasks);
    return { success: true, message: "Tasks saved successfully" };
  },
};

export default function ModificarListaTareas() {
  const [tasks, setTasks] = useState([]);
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

  const handleAddTask = () => {
    setTasks([
      ...tasks,
      { id: Date.now(), name: "Nueva tarea", assignees: [] },
    ]);
  };

  const handleDeleteTask = (id) => {
    setCuadroDialogo({
      open: true,
      title: "Eliminar tarea",
      description: "Esta acción eliminará la tarea permanentemente. ¿Está seguro?",
      onConfirm: () => {
        setTasks(tasks.filter((task) => task.id !== id));
        setCuadroDialogo({ ...cuadroDialogo, open: false });
      },
    });
  };

  const handleEditTask = (id, newName) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, name: newName } : task))
    );
  };

  const handleReject = () => {
    setCuadroDialogo({
      open: true,
      title: "Descartar los cambios",
      description: "¿Estás seguro de que deseas descartar los cambios? Esta accion no se puede deshacer",
      onConfirm: () => window.location.reload(),
    });
  };

  const handleSave = async () => {
    setCuadroDialogo({
      open: true,
      title: "Guardar los cambios",
      description: "Esta acción guardará todos los cambios en esta lista de tareas. ¿Está seguro?",
      onConfirm: handleConfirmSave,
    });
  };

  const handleConfirmSave = async () => {
    try {
      const result = await api.saveTasks(tasks);
      setSnackbar({
        open: true,
        message: result.message,
        severity: "success",
      });
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
      titulo={"MODIFICAR LISTA SEMANAL DE TAREAS"}
      ocultarAtras={false}
      confirmarAtras={false}
      dirBack={"/"}
    >
      <Container maxWidth="md" sx={{ mt: 4, px: { xs: 2, sm: 3 } }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: "bold" }}>
          SPRINT 2
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom align="center" sx={{ mb: 3 }}>
          SEMANA 1
        </Typography>
        {tasks.length === 0 ? (
          <Typography variant="h4" align="center" sx={{ mb: 5.4, mt: 6}}>
            No hay tareas aún
          </Typography>
        ) : (
          <List sx={{
            width: "100%",
            bgcolor: "background.paper",
            borderRadius: 2,
            overflow: "hidden",
          }}>
            {tasks.map((task) => (
              <ListItem
                key={task.id}
                sx={{
                  bgcolor: "#CFD4E1",
                  mb: 1,
                  py: 2,
                  px: 3,
                  "&:last-child": { mb: 0 },
                  "&:hover": { bgcolor: "#BFC4D1" },
                  transition: "background-color 0.3s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
                  <TextField
                    value={task.name}
                    onChange={(e) => handleEditTask(task.id, e.target.value)}
                    variant="standard"
                    fullWidth
                    InputProps={{
                      disableUnderline: true,
                      style: { fontSize: "1.25rem", fontWeight: "medium" },
                    }}
                  />
                  {task.assignees.length > 0 && (
                    <AvatarGroup max={3} sx={{ ml: 2 }}>
                      {task.assignees.map((assignee, index) => (
                        <Avatar key={index} src={assignee} />
                      ))}
                    </AvatarGroup>
                  )}
                </Box>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDeleteTask(task.id)}
                  sx={{ ml: 2 }}
                >
                  Eliminar
                </Button>
              </ListItem>
            ))}
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
          validateButtonText="Aceptar cambios"
          onReject={handleReject}
          onValidate={handleSave}
          disabledButton= {0}
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
    </BaseUI>
  );
}