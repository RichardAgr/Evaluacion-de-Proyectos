import { Fragment, useState, useEffect } from "react";
import BaseUI from "../../../components/baseUI/baseUI";
import { styled } from "@mui/material";
import InfoEmpresa from "../../../components/infoEmpresa/nombreEmpresa";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    Box,
    CircularProgress,
    Typography,
} from "@mui/material";

function CalificarEstSemana() {
    const empresaId = 1; 
    const Sprint = "1";
    const [nombreEmpresa, setNombreEmpresa] = useState({ nombreCorto: '', nombreLargo: '' });
    const [teamData, setTeamData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getNombreEmpresa = async (empresaId) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/nombreEmpresa/${empresaId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) throw new Error('Error al obtener los datos de la empresa');

            const data = await response.json();    
            setNombreEmpresa({ nombreCorto: data.nombreEmpresa, nombreLargo: data.nombreLargo });
        } catch (error) {
            console.error('Error en la solicitud:', error);
            setError(true);
        }
    };

    const getNotasSprint = async (empresaId, Sprint) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/empresas/notaSprint/${empresaId}/${Sprint}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
    
            if (!response.ok) throw new Error('Error al obtener las notas del sprint');
    
            const data = await response.json();
            setTeamData(data);
        } catch (error) {
            console.error('Error en la solicitud:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        getNombreEmpresa(empresaId);
        getNotasSprint(empresaId, Sprint);
    }, []);

    return (
        <Fragment>
            <BaseUI
                titulo={'RESULTADOS EVALUACIONES SEMANALES PREVIAS'}
                dirBack={'/'}
                loading={loading}
                error={{error:error}}
            >
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
                            {Object.keys(teamData).length > 0 ? (
                                Object.entries(teamData).map(([nombreCompleto, detalles]) => (
                                    <TableRow key={detalles.id}>
                                        <TableCell>{nombreCompleto}</TableCell>
                                        <TableCell sx={{ py: 1 }}>
                                            <ul style={{ margin: 0, paddingInlineStart: "20px" }}>
                                                {detalles.tareas.map((tarea, index) => (
                                                    <li key={index}>{tarea}</li>
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
                                                    color: detalles.nota < 50 ? 'red' : 'black'
                                                }}
                                            >
                                                {detalles.nota}
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
                                                {detalles.comentario}
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} sx={{ textAlign: 'center', py: 2 }}>
                                        No se encontraron registros para este sprint.
                                    </TableCell>
                                </TableRow>
                            )}
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
