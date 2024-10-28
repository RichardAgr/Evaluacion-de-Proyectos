import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  List,
  ListItem,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Add as AddIcon, Delete as DeleteIcon, Close as CloseIcon } from '@mui/icons-material';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(3),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(2),
  },
}));

const StyledDialogTitle = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(2),
}));

export default function AnadirEntregables({ open, handleClose, initialEntregables = [] }) {
  const [entregables, setEntregables] = useState(initialEntregables);

  useEffect(() => {
    setEntregables(initialEntregables);
  }, [initialEntregables]);

  const handleAddEntregable = () => {
    setEntregables([...entregables, '']);
  };

  const handleDeleteEntregable = (index) => {
    const nuevosEntregables = entregables.filter((_, i) => i !== index);
    setEntregables(nuevosEntregables);
  };

  const handleChangeEntregable = (index, value) => {
    const nuevosEntregables = [...entregables];
    nuevosEntregables[index] = value;
    setEntregables(nuevosEntregables);
  };

  const handleSaveAndClose = () => {
    const entregablesFiltrados = entregables.filter(entregable => entregable.trim() !== '');
    handleClose(entregablesFiltrados);
  };

  return (
    <StyledDialog 
      open={open} 
      onClose={() => handleClose(initialEntregables)} 
      maxWidth="sm" 
      fullWidth
      aria-labelledby="customized-dialog-title"
    >
      <StyledDialogTitle>
        <Typography variant="h6" component="h2" id="customized-dialog-title">
          Modificar Entregables
        </Typography>
        <IconButton
          aria-label="close"
          onClick={() => handleClose(initialEntregables)}
          sx={{
            color: (theme) => theme.palette.grey[300],
            '&:hover': {
              color: (theme) => theme.palette.grey[100],
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </StyledDialogTitle>
      <DialogContent dividers>
        <List>
          {entregables.map((entregable, index) => (
            <ListItem key={index} sx={{ mb: 2 }}>
              <TextField
                fullWidth
                value={entregable}
                onChange={(e) => handleChangeEntregable(index, e.target.value)}
                aria-label={`Entregable ${index + 1}`}
              />
              <Button
                variant="contained"
                color="secondary"
                startIcon={<DeleteIcon />}
                onClick={() => handleDeleteEntregable(index)}
                aria-label={`Eliminar entregable ${index + 1}`}
                sx={{ maxHeight: "55px", ml: 1 }}
              >
                Eliminar
              </Button>
            </ListItem>
          ))}
        </List>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddEntregable}
          fullWidth
          sx={{ mt: 2 }}
        >
          Añadir Entregable
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(initialEntregables)} color="secondary" variant="contained">
          Descartar
        </Button>
        <Button onClick={handleSaveAndClose} color="primary" variant="contained">
          Guardar
        </Button>
      </DialogActions>
    </StyledDialog>
  );
}