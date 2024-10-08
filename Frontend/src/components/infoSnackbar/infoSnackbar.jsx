import React from "react";
import { Snackbar, Alert } from "@mui/material";

const InfoSnackbar = ({
  openSnackbar,
  setOpenSnackbar,
  message = "This is a default message",
  severity = "info",
}) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false); // Cierra el Snackbar desde el padre
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={openSnackbar}
      autoHideDuration={6000} // Se cierra automáticamente tras 6 segundos
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default InfoSnackbar;
