import { Fragment, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getPlanificacionesAceptadas } from '../../../../api/getPlanificacionesAceptadas';
import { useNavigate } from 'react-router-dom';
import BaseUI from '../../../../components/baseUI/baseUI';

function ListaVerPlanificacion() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [listaEmpresas, setListaEmpresas] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [lista] = await Promise.all([getPlanificacionesAceptadas()]);
                setListaEmpresas(lista);
                console.log(lista);
            } catch (error) {
                console.error('Error en la solicitud:', error.message);
                setError(`Error en la solicitud: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <p>Cargando datos...</p>;
    if (error) return <p>Error: {error}</p>;

    const handleRowClick = (idEmpresa) => {
        navigate(`/homeDocente/homeGrupoDocente/verPlanificacionDeEmpresas/Empresa/${idEmpresa}`);
    };

    return (
        <Fragment>
            <BaseUI
                titulo = {'VER PLANIFICACIONES DE DESAROLLO'}
                ocultarAtras = {false}
                confirmarAtras = {false}
                dirBack = {'/'}
            >
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Nombre Empresa</TableCell>
                            <TableCell align="left">Nombre Largo</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listaEmpresas.map((empresa) => (
                            <TableRow
                                key={empresa.idEmpresa}
                                sx={{
                                    cursor: 'pointer',
                                    '&:hover': {
                                        backgroundColor: '#e0e0e0'
                                    },
                                    '&:last-child td, &:last-child th': { border: 0 }
                                }}
                                onClick={() => handleRowClick(empresa.idEmpresa)}
                            >
                                <TableCell component="th" scope="row" align='left'>
                                    {empresa.nombreEmpresa}
                                </TableCell>
                                <TableCell align='left'>
                                    {empresa.nombreLargo}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        
            </BaseUI>
        </Fragment>
    );
}

export default ListaVerPlanificacion;
