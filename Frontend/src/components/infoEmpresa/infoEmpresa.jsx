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
        <Typography variant="subtitle" component="h1" gutterBottom>
          {nombreCorto}
        </Typography>
        <Typography variant="subtitle" component="h3" color="text.secondary">
          {nombreLargo}
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
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Paper>
  );
};

export default InfoEmpresa;

/* let ContainerInfoEmpresa = styled.div`
    width: 100%;
    margin-top: 1rem;
    margin-bottom: 1rem;
    border: 0.3rem solid black;
    border-radius: 0.3rem;
        -webkit-border-radius: 0.3rem;
        -moz-border-radius: 0.3rem;
        -ms-border-radius: 0.3rem;
        -o-border-radius: 0.3rem;
    h1,h2{
        text-align: center;
    }
    .integrantes{
        margin: calc(3vw + 1rem);
        display: block;
    }
    .docente{
        margin: calc(3vw + 1rem);
        display: block;        
    }
    p{  
        margin-left: calc(2vw + 8rem);
    }
    span{
        color: darkgray;
    }
` */
