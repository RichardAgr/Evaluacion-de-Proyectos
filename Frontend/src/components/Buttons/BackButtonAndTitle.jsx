import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

function BackButtonAndTitle({ title }) {
    const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);  // funcion para llevar a atras
  };

  return (
    <div className="mb-4">
      <Button variant="contained" onClick={handleBack} className="mb-2">
        Atrás
      </Button>
      <h1 className="text-2xl font-bold">{title}</h1>
    </div>
  );
}

export default BackButtonAndTitle;