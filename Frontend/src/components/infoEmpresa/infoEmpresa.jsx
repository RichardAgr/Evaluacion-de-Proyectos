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
    <Paper elevation={1} sx={{ p: 3, mt: 2, mb: 2 }}>
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {nombreLargo}
        </Typography>
        <Typography variant="h5" component="h2" color="text.secondary">
          {nombreCorto}
        </Typography>
      </Box>
      <Box sx={{ mt: 4, ml: 4 }}>
        <Typography variant="h6" component="h3" gutterBottom>
          Integrantes:
        </Typography>
        <List>
          {integrantes.map((integrante, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`${integrante.nombreEstudiante} ${integrante.primerApellido} ${integrante.segundoApellido}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Paper>
  );
};

export default InfoEmpresa;
