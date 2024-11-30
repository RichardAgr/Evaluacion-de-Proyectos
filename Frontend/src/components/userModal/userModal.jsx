import { useState } from "react";
import {
  Modal,
  Box,
  Avatar,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const UserProfileModal = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      {/* Botón para abrir el modal */}
      <Button
        variant="contained"
        onClick={handleOpen}
        sx={{
          backgroundColor: "#5e35b1",
          color: "#fff",
          fontWeight: "bold",
        }}
      >
        Abrir Perfil
      </Button>

      {/* Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 340,
            bgcolor: "white",
            boxShadow: 24,
            borderRadius: "16px",
            overflow: "hidden",
          }}
        >
          {/* Encabezado con fondo morado */}
          <Box
            sx={{
              backgroundColor: "#5e35b1",
              color: "white",
              textAlign: "center",
              padding: "16px",
              borderRadius: "16px 16px 0 0",
            }}
          >
            <Avatar
              src="https://via.placeholder.com/150"
              alt="Wendy Tequilla"
              sx={{
                width: 80,
                height: 80,
                margin: "0 auto",
                border: "2px solid white",
              }}
            />
            <Typography variant="h6" sx={{ marginTop: "8px" }}>
              Wendy Tequilla
            </Typography>
            <Typography variant="body2">Developer</Typography>
          </Box>

          {/* Parte blanca con estadísticas */}
          <Box sx={{ padding: "16px" }}>
            {/* Estadísticas en tres columnas */}
            <Grid container spacing={2} sx={{ textAlign: "center" }}>
              <Grid item xs={4}>
                <Typography variant="h6">12K</Typography>
                <Typography variant="caption" color="textSecondary">
                  Seguidores
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="h6">85%</Typography>
                <Typography variant="caption" color="textSecondary">
                  Completado
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="h6">25</Typography>
                <Typography variant="caption" color="textSecondary">
                  Cursos
                </Typography>
              </Grid>
            </Grid>

            {/* Botón flotante en la esquina inferior derecha */}
            <Box sx={{ position: "relative", marginTop: "16px" }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#4527a0",
                  color: "white",
                  borderRadius: "50%",
                  width: 56,
                  height: 56,
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  boxShadow: 3,
                  "&:hover": {
                    backgroundColor: "#311b92",
                  },
                }}
              >
                <AddIcon />
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default UserProfileModal;
