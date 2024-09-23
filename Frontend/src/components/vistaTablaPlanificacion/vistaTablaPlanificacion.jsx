import { Fragment } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
function vistaTablaPlanificacion({sprints}) {
  return (
    <Fragment>
        <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Hito</TableCell>
                        <TableCell align="left">Fecha Inicio</TableCell>
                        <TableCell align="left">Fecha Fin</TableCell>
                        <TableCell align="left">Cobro</TableCell>
                        <TableCell align="left">Fecha Entrega</TableCell>
                        <TableCell align="left">Entregables</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {sprints.map((sprint,index) => (
                        <TableRow
                        key={sprint.fechaIni}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {'SPRINT '+(index+1)}
                        </TableCell>
                        <TableCell align="left">{sprint.fechaIni}</TableCell>
                        <TableCell align="left">{sprint.fechaFin}</TableCell>
                        <TableCell align="left">{sprint.cobro}</TableCell>
                        <TableCell align="left">{sprint.fechaEntrega}</TableCell>
                        <TableCell align="left">{sprint.entregables}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
    </Fragment>
  );
}

export default vistaTablaPlanificacion;

