import { Fragment, useState, useEffect } from "react";
import BaseUI from "../../../../components/baseUI/baseUI";
import { styled } from "@mui/material";
import InfoEmpresa from "../../../../components/infoEmpresa/nombreEmpresa";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    Box,
} from "@mui/material";

function CalificarEstSemana() {
    const empresaId = 1; 
    const Sprint = "1";
    const [nombreEmpresa, setNombreEmpresa] = useState({ nombreCorto: '', nombreLargo: '' });

    const getNombreEmpresa = async (empresaId) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/nombreEmpresa/${empresaId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Error al obtener los datos de la empresa');
            }

            const data = await response.json();    
            setNombreEmpresa({ nombreCorto: data.nombreEmpresa, nombreLargo: data.nombreLargo });
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };

    useEffect(() => {
        getNombreEmpresa(empresaId);
    }, []);
    
    const [teamData] = useState([
        {
            id: 1, 
            name: 'Alejandro Rodríguez', 
            tasks: ['Desarrollo Backend'], 
            note: 0, 
            comments: 'Buen trabajo en general.', 
        },
        {
            id: 2, 
            name: 'María García', 
            tasks: ['Diseño UI/UX'], 
            note: 70, 
            comments: 'Excelente creatividad.', 
        },
        {
            id: 3, 
            name: 'Joaquín Pérez', 
            tasks: ['Testing y QA'], 
            note: 45, 
            comments: 'Cumplió con todas las tareas asignadas.', 
        },
        {
            id: 4, 
            name: 'Jhok Corrales', 
            tasks: [], // No tiene tareas
            note: 100, 
            comments: 'Cumplió con todas las tareas asignadas.', 
        },
        {
            id: 5, 
            name: 'Sabrina Fernadez', 
            tasks: ['Diseño UI/UX'], 
            note: 70, 
            comments: 'Excelente creatividad.', 
        },
        {
            id: 6, 
            name: 'Melani Pérez', 
            tasks: ['Testing y QA','Documentacion'], 
            note: 25, 
            comments: 'Cumplió con todas las tareas asignadas.Cumplió con todas las tareas asignadas.Cumplió con todas las tareas asignadas.Cumplió con todas las tareas asignadas.Cumplió con todas las tareas asignadas.', 
        },
    ]);

    return (
        <Fragment>
            <BaseUI
                titulo={'RESULTADOS EVALUACIONES SEMANALES PREVIAS'}
                dirBack={'/'}>
                <NombreSprint><h1>SPRINT {Sprint}</h1></NombreSprint>
                <InfoEmpresa nombreCorto={nombreEmpresa.nombreCorto} nombreLargo={nombreEmpresa.nombreLargo} />
                <TablaContainer component={Paper}>
                    <Table aria-label="team evaluation table" size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Integrante</TableCell>
                                <TableCell>Tareas</TableCell>
                                <TableCell>Nota (1-100)</TableCell>
                                <TableCell>Comentario</TableCell>
                            </TableRow>
                        </TableHead>  
                        <TableBody>
                            {teamData.map((member) => (
                                <TableRow key={member.id}>
                                    <TableCell>{member.name}</TableCell>
                                    {member.tasks.length > 0 ? (
                                        <>
                                            <TableCell sx={{ py: 1 }}>
                                                <ul style={{ margin: 0, paddingInlineStart: "20px" }}>
                                                    {member.tasks.map((task, taskIndex) => (
                                                        <li key={taskIndex}>{task}</li>
                                                    ))}
                                                </ul>
                                            </TableCell>
                                            <TableCell sx={{ py: 2 }}>
                                                <Box
                                                    sx={{
                                                        width: "40px",
                                                        textAlign: 'left',
                                                        padding: '8px',
                                                        border: '1px solid #e0e0e0',
                                                        borderRadius: '4px',
                                                        color: member.note < 50 ? 'red' : 'black'
                                                    }}
                                                >
                                                    {member.note}
                                                </Box>
                                            </TableCell>
                                            <TableCell sx={{ py: 1 }}>
                                                <Box
                                                    fullWidth
                                                    sx={{
                                                        textAlign: 'left',
                                                        minHeight: '70px',
                                                        padding: '8px',
                                                        border: '1px solid #e0e0e0',
                                                        borderRadius: '4px'
                                                    }}
                                                >
                                                    {member.comments}
                                                </Box>
                                            </TableCell>
                                        </>
                                    ) : (
                                        <TableCell colSpan={4} sx={{ color: 'Black', textAlign: 'center', py: 2 }}>
                                            Sin tareas asignadas.
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))}
                        </TableBody> 
                    </Table>
                </TablaContainer>
            </BaseUI>
        </Fragment>
    );
}

export default CalificarEstSemana;

const NombreSprint = styled('div')({
    justifyContent: 'flex-start',
});

const TablaContainer = styled('div')({
    overflowX: 'auto', 
    marginTop: '20px',
    width: '100%', 
});
