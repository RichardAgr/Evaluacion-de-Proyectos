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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import BaseUI from "../../../../components/baseUI/baseUI.jsx";

const ModificarListaTareas = () => {
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
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), name: newTask, assignees: [] }]);
      setNewTask("");
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
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
                <ListItemText 
                  primary={task.name} 
                  primaryTypographyProps={{ 
                    variant: "h6", 
                    component: "h3",
                    sx: { fontWeight: 'medium' }
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
        <Box sx={{ display: "flex", flexDirection: "column", mt: 3, mb: 2 }}>
          <Box sx={{ display: "flex", mb: 2 }}>
            <input
              type="text"
              placeholder="Nueva tarea"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              style={{
                flexGrow: 1,
                padding: '10px',
                fontSize: '16px',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
            />
          </Box>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddTask}
            sx={{ alignSelf: "flex-start" }}
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
          <Button variant="contained" color="secondary">
            Cancelar
          </Button>
          <Button variant="contained" color="primary">
            Guardar
          </Button>
        </Box>
      </Container>
    </BaseUI>
  );
};

export default ModificarListaTareas;