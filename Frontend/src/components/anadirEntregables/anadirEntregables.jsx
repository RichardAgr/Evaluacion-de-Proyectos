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
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';

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
    <Dialog open={open} onClose={() => handleClose(initialEntregables)} maxWidth="sm" fullWidth>
      <DialogTitle>Modificar Entregables</DialogTitle>
      <DialogContent>
        <List>
          {entregables.map((entregable, index) => (
            <ListItem key={index}>
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
                        sx={{maxHeight:"55px",  ml:1}}
                      >
                        Eliminar Entregable
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
    </Dialog>
  );
}