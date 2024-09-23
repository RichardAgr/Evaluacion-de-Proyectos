import { Fragment } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styled from '@emotion/styled'
function tablaPlanificacionNotas() {
    function createData(titulo, nota) {
    return { titulo, nota};
  }
  const rows = [
    createData('FALTAS DEL GRUPO', 0),
    createData('NOTA SUMATORIA SPRINTS', ),
    createData('NOTA PRODUCTO TERMINADO', ),
  ];
  return (
    <Fragment>
        <ContainerTablaNotas>
      <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableBody>
                {rows.map((row) => (
                <TableRow
                    key={row.titulo}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row">
                    {row.titulo}
                    </TableCell>
                    <TableCell align="left">{row.nota}</TableCell>
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
    border-radius: 0.3rem;
      -webkit-border-radius: 0.3rem;
      -moz-border-radius: 0.3rem;
      -ms-border-radius: 0.3rem;
      -o-border-radius: 0.3rem;
    border: 0.3rem solid black
`