import { Box, Typography } from "@mui/material";

function EstadoPlanificacion({ estado, comentariopublico }) {
  console.log(estado);
  console.log(comentariopublico);
  return (
    <Box display="flex" sx={{ textAlign: "center", mb: 1 }}>
      <Typography variant="subtitle" component="h2" gutterBottom sx={{ mr: 2 }}>
        Estado:
      </Typography>
      {estado === 1 ? (
        <Typography variant="subtitle" component="h2" color="green">
          Validada
        </Typography>
      ) : estado === 0 && comentariopublico !== null ? (
        <Typography variant="subtitle" component="h2" color="red">
          Rechazada
        </Typography>
      ) : (
        <Typography variant="subtitle" component="h2" color="red">
          No revisada
        </Typography>
      )}
    </Box>
  );
}

export default EstadoPlanificacion;