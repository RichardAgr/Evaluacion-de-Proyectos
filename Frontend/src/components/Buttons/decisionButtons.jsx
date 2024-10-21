import React from 'react';
import { Box, Button } from '@mui/material';

export default function DecisionButtons({
  rejectButtonText,
  validateButtonText,
  onReject,
  onValidate
}) {
  return (
    <Box
      sx={{
        marginTop: "20px",
        display: "flex",
        justifyContent: "flex-end",
        gap: "30px",
      }}
    >
      <Button
        variant="contained"
        color="secondary"
        onClick={onReject}
      >
        {rejectButtonText}
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={onValidate}
      >
        {validateButtonText}
      </Button>
    </Box>
  );
}