import React from 'react';
import { Box, CircularProgress, Typography, Paper } from '@mui/material';

export default function Loading() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "200px",
        }}
      >
        <CircularProgress size={60} thickness={4} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Cargando...
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
          Por favor, espere mientras procesamos su solicitud.
        </Typography>
      </Box>
    </>
  );
}