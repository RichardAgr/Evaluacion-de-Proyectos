/* eslint-disable react/prop-types */
import { Fragment } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
function Comentario({ comentariopublico }) {
  return (
    <>
      <Box display="flex" sx={{ textAlign: "center", mb: 1 }}>
        <Typography
          variant="subtitle"
          component="h2"
          gutterBottom
          sx={{ mr: 2 }}
        >
          Comentario:
        </Typography>
      </Box>
      <Box>
      <Paper
        elevation={3}
        sx={{
          p: 5,
          backgroundColor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
          <Typography variant="body1">{comentariopublico}</Typography>
        </Paper>
      </Box>
    </>
  );
}

export default Comentario;
