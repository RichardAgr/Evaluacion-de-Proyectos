import React, { useState } from "react";
import { TextField, Box, Typography } from "@mui/material";

export default function CuadroNota({ title = "Nota:", onNoteChange }) {
  const [note, setNote] = useState("");

  const handleNoteChange = (event) => {
    const value = event.target.value;
    if (value === "" || (parseInt(value) >= 0 && parseInt(value) <= 100)) {
      setNote(value);
      if (onNoteChange) {
        onNoteChange(value);
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        maxWidth: 135,
        mt: 2,
      }}
    >
      <Typography variant="body1" sx={{ mr: 2 }}>
        {title}
      </Typography>
      <TextField
        type="number"
        value={note}
        onChange={handleNoteChange}
        fullWidth
        margin="normal"
        inputProps={{ min: 0, max: 100 }}
        helperText="1 - 100"
      />
    </Box>
  );
}
