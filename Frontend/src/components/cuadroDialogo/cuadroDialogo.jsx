import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(3),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(2),
  },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const CuadroDialogo = ({ open, onClose, title, description, onConfirm }) => {
  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      maxWidth="sm"
      fullWidth
    >
      <StyledDialogTitle id="customized-dialog-title">
        <Typography variant="h6">{title}</Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
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
        <DialogContentText>
          <Box sx={{ mt: 2, mb: 2 }}>
            <Typography variant="body1">{description}</Typography>
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" variant="contained">
          Cancelar
        </Button>
        <Button onClick={onConfirm} color="primary" variant="contained" autoFocus>
          Confirmar
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};

export default CuadroDialogo;