import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";

const InfoEmpresa = ({ nombreLargo, nombreCorto, integrantes }) => {
  return (
    <Paper elevation={1} sx={{ p: 2, my: 1 }}>
      <Box sx={{ textAlign: "center", mb: 1 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          {nombreLargo}
        </Typography>
        <Typography variant="subtitle1" component="h2" color="text.secondary">
          {nombreCorto}
        </Typography>
      </Box>
      <Box sx={{ ml: 4 }}>
        <Typography variant="subtitle" component="h3" gutterBottom>
          Integrantes:
        </Typography>
        <List dense>
          {integrantes.map((integrante, index) => (
            <ListItem key={index} disableGutters>
              <ListItemText
                primary={`${integrante.nombreEstudiante} ${integrante.primerApellido} ${integrante.segundoApellido}`}
                primaryTypographyProps={{ variant: 'body1' }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Paper>
  );
};

export default InfoEmpresa;