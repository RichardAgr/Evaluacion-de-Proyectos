import React from 'react';
import {
  Button,
  Grid,
} from '@mui/material';
import Header from "../../../../../components/Header/header.jsx";
import Footer from "../../../../../components/Footer/footer.jsx";
import BackButtonAndTitle from "../../../../../components/Buttons/BackButtonAndTitle.jsx";

const TaskList = () => {
  const tasks = [
    "Sprint 1",
    "Sprint 2",
    "Sprint 3",
    "Sprint 4",
    "Sprint 5"
  ];

  return (
    <Grid container direction="column" spacing={2} style={{ 
        padding: '20px', 
      }}>
        {tasks.map((task, index) => (
          <Grid item key={index}>
            <Button
              variant="contained"
              fullWidth
              style={{ 
                justifyContent: 'flex-start', 
                textAlign: 'left', 
                height: '100%',
                whiteSpace: 'normal',
                textTransform: 'none',
                fontSize: '18px',  // Aumentar el tamaño de la fuente
                padding: '16px',  // Aumentar el padding
                borderRadius: '8px',  // Agregar esquinas redondas
                backgroundColor: '#CFD4E1',  // Color verde claro
                color: 'Black',
                '&:hover': {
                  backgroundColor: '#3e8e41',  // Un tono más oscuro para el hover
                },
              }}
            >
              {task}
            </Button>
          </Grid>
        ))}
      </Grid>
  );
};

const ListaSemanas = () => {
  return (
    <React.Fragment>
      <Header />
      <div className='box'>
        <div className='container'>
          <BackButtonAndTitle title="PLANIFICACIÓN DE DESARROLLO:" />
          <div className='pageBorder'>
            <TaskList />
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default ListaSemanas;