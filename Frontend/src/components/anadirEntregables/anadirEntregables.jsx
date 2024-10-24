import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

export default function AnadirEntregables({ open, handleClose, initialEntregables = [] }) {
  const [entregables, setEntregables] = useState(initialEntregables);
  const [nuevoEntregable, setNuevoEntregable] = useState('');
  const [editando, setEditando] = useState(null);

  const handleAddEntregable = () => {
    if (nuevoEntregable.trim() !== '') {
      setEntregables([...entregables, nuevoEntregable.trim()]);
      setNuevoEntregable('');
    }
  };

  const handleDeleteEntregable = (index) => {
    const nuevosEntregables = entregables.filter((_, i) => i !== index);
    setEntregables(nuevosEntregables);
  };

  const handleEditEntregable = (index) => {
    setEditando(index);
    setNuevoEntregable(entregables[index]);
  };

  const handleSaveEdit = () => {
    if (nuevoEntregable.trim() !== '') {
      const nuevosEntregables = [...entregables];
      nuevosEntregables[editando] = nuevoEntregable.trim();
      setEntregables(nuevosEntregables);
      setEditando(null);
      setNuevoEntregable('');
    }
  };

  const handleCancelEdit = () => {
    setEditando(null);
    setNuevoEntregable('');
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Modificar Entregables</DialogTitle>
      <DialogContent>
        <List>
          {entregables.map((entregable, index) => (
            <ListItem key={index}>
              {editando === index ? (
                <TextField
                  fullWidth
                  value={nuevoEntregable}
                  onChange={(e) => setNuevoEntregable(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit()}
                />
              ) : (
                <ListItemText primary={entregable} />
              )}
              <ListItemSecondaryAction>
                {editando === index ? (
                  <>
                    <IconButton edge="end" onClick={handleSaveEdit}>
                      <AddIcon />
                    </IconButton>
                    <IconButton edge="end" onClick={handleCancelEdit}>
                      <DeleteIcon />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <IconButton edge="end" onClick={() => handleEditEntregable(index)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" onClick={() => handleDeleteEntregable(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </>
                )}
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        <TextField
          fullWidth
          label="Nuevo entregable"
          value={nuevoEntregable}
          onChange={(e) => setNuevoEntregable(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddEntregable()}
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddEntregable}
          disabled={nuevoEntregable.trim() === ''}
        >
          Añadir Entregable
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleClose} color="primary" variant="contained">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}