import { Fragment } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styled from '@emotion/styled'
function tablaPlanificacionNotas() {
    function createData(hito, fechaIni, fechaFin, cobro, fechaEntrega, entregables) {
    return { hito, fechaIni, fechaFin, cobro, fechaEntrega, entregables };
  }
  const rows = [
    createData('FALTAS DEL GRUPO', 159, 6.0, 24, 4.0, 'Modelo ER'),
    createData('NOTA SUMATORIA SPRINTS', 237, 9.0, 37, 4.3, 'Modelo ER'),
    createData('NOTA PRODUCTO TERMINADO', 262, 16.0, 24, 6.0, 'Modelo ER'),
  ];
  return (
    <Fragment>
        <ContainerTablaNotas>
      <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableBody>
                {rows.map((row) => (
                <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row">
                    {row.hito}
                    </TableCell>
                    <TableCell align="left">{row.fechaIni}</TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
        </ContainerTablaNotas>
    </Fragment>
  );
}

export default tablaPlanificacionNotas;

let ContainerTablaNotas = styled.div`
    width: 100%;
    margin-top: 1rem;
    margin-bottom: 1rem;
    border: 0.3rem solid black;
`