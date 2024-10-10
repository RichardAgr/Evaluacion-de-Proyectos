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

const ModificarListaTareas = () => {
  const [openRejectDialog, setOpenRejectDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "MockUps",
      assignees: [
        "https://i.pravatar.cc/150?img=1",
        "https://i.pravatar.cc/150?img=2",
      ],
    },
    { id: 2, name: "ProductBacklog", assignees: [] },
  ]);

  const handleAddTask = () => {
    setTasks([...tasks, { id: Date.now(), name: "Nueva tarea", assignees: [] }]);
  };

  const handleConfirmDelete = (id) => {
    if (taskToDelete !== null) {
      handleDeleteTask(taskToDelete);
      setTaskToDelete(null);
    }
    setOpenDeleteDialog(false);

  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEditTask = (id, newName) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, name: newName } : task
    ));
  };

  const handleConfirmCancelar = () => {
    // Lógica específica de esta página
    console.log("Acción confirmada en EnhancedExamplePage");
    setOpenRejectDialog(false);
  };

  const handleConfirmGuardar = () => {
    // Lógica específica de esta página
    console.log("Acción confirmada en EnhancedExamplePage");
    setOpenConfirmDialog(false);
  };

  return (
    <BaseUI
      titulo={"MODIFICAR LISTA SEMANAL DE TAREAS"}
      ocultarAtras={false}
      confirmarAtras={false}
      dirBack={"/"}
    >
      <Container maxWidth="md" sx={{ mt: 4, px: { xs: 2, sm: 3 } }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          align="center"
          sx={{ fontWeight: "bold" }}
        >
          SPRINT 2
        </Typography>
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          align="center"
          sx={{ mb: 3 }}
        >
          SEMANA 1
        </Typography>
        <List sx={{ width: '100%', bgcolor: "background.paper", borderRadius: 2, overflow: 'hidden' }}>
          {tasks.map((task) => (
            <ListItem
              key={task.id}
              sx={{
                bgcolor: "#CFD4E1",
                mb: 1,
                py: 2,
                px: 3,
                '&:last-child': { mb: 0 },
                '&:hover': { bgcolor: "#BFC4D1" },
                transition: 'background-color 0.3s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                <TextField
                  value={task.name}
                  onChange={(e) => handleEditTask(task.id, e.target.value)}
                  variant="standard"
                  fullWidth
                  InputProps={{
                    disableUnderline: true,
                    style: { fontSize: '1.25rem', fontWeight: 'medium' }
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
                onClick={() => {
                  setTaskToDelete(task.id);
                  setOpenDeleteDialog(true);}}
                sx={{ ml: 2 }}
              >
                Eliminar
              </Button>
            </ListItem>
          ))}
        </List>
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
        <Box
          sx={{
            marginTop: "40px",
            display: "flex",
            justifyContent: "flex-end",
            gap: "20px",
          }}
        >
                  <Button
            variant="contained"
            color="secondary"
            onClick={() => setOpenRejectDialog(true)}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenConfirmDialog(true)}
          >
            Guardar
          </Button>
        </Box>
        <CuadroDialogo
          open={openRejectDialog}
          onClose={() => setOpenRejectDialog(false)}
          title="Cancelar cambios"
          description="Todos los cambios realizados se perderán. Esta acción no se puede deshacer."
          onConfirm={handleConfirmCancelar}
        />
        <CuadroDialogo
          open={openConfirmDialog}
          onClose={() => setOpenConfirmDialog(false)}
          title="Guardar cambios"
          description="Esta acción guardará todos los cambios realizados. ¿Está segur@?"

          onConfirm={handleConfirmGuardar}
        />
        <CuadroDialogo
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
          title="Eliminar tarea"
          description="Esta acción eliminará la tarea  seleccionada. ¿Está segur@?"


          onConfirm={handleConfirmDelete}
        />
      </Container>
    </BaseUI>
  );
};

export default ModificarListaTareas;