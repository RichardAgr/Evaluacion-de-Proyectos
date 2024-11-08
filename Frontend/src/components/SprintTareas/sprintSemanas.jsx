import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

/* eslint-disable react/prop-types */

const SprintSemanas = ({ title, semana, idSprint, navigateLink}) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const togglePanel = () => {
        setIsOpen(!isOpen);
    };

    const clickBoton = (tarea) => {
        console.log("click", tarea)
        navigate(navigateLink?navigateLink+`${tarea.idTarea}`:`/homeEstudiante/homeGrupoEstudiante/sprint/${idSprint}/tarea/${tarea.idTarea}`); 
    }

    return (
        <DivLista>
            <Box 
                onClick={togglePanel}
                sx={{
                    width: '90%',
                    height: 60,
                    borderRadius: 0.6,
                    margin: 0.7,
                    marginLeft: 'calc(2vw + 0.5rem)',
                    pl: 2,
                    fontSize: '1.5rem',
                    bgcolor: '#d0d4e4', 
                    textTransform: 'uppercase',
                    display: 'flex', 
                    cursor: 'pointer',
                    justifyContent: 'flex-start', 
                    alignItems: 'center', 
                    '&:hover': {
                        bgcolor: '#c0c4d4', 
                    },
                }}            
            >
                {isOpen ? <div className='arrow-down'></div> : <div className='arrow-right'></div> }
                {title}
            </Box>

            {isOpen && (
                <Box>
                    {semana.tareas.length > 0 ? (
                        semana.tareas.map((tarea) => (
                            <Box 
                                onClick={() => { clickBoton(tarea); }} 
                                key={tarea.idTarea}
                                sx={{
                                    width: 'calc(66vw + 1rem)',
                                    height: 60,
                                    borderRadius: 0.6,
                                    margin: 0.7,
                                    marginLeft: 'calc(5vw + 0.5rem)',
                                    pl: 2,
                                    fontSize: 'calc(1vw + 0.5rem)',
                                    bgcolor: '#d0d4e4', 
                                    textTransform: 'uppercase',
                                    display: 'flex', 
                                    cursor: 'pointer',
                                    alignItems: 'center', 
                                    '&:hover': {
                                        bgcolor: '#c0c4d4', 
                                    },
                                }}            
                            >
                                {tarea.nombreTarea}
                            </Box>
                        ))
                    ) : (
                        <Box 
                            sx={{
                                width: '80%',
                                height: 60,
                                borderRadius: 0.6,
                                margin: 0.7,
                                marginLeft: 15,
                                pl: 2,
                                textAlign: 'center',
                                fontSize: '1.5rem',
                                bgcolor: '#d0d4e4',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            No hay tareas asignadas para esta semana.
                        </Box>
                    )}
                </Box>
            )}
        </DivLista>
    );
};

export default SprintSemanas;

const DivLista = styled("div")`
    display: flex;
    flex-direction: column;
    margin: 0rem;
    .arrow-down {
        margin-right: 0.5rem;
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: 10px solid black;
    }
    .arrow-right { 
        width: 0; 
        height: 0;
        border-top: 10px solid transparent; 
        border-bottom: 10px solid transparent; 
        border-left: 10px solid black; 
        margin-right: 0.5rem;
    }   

`;
