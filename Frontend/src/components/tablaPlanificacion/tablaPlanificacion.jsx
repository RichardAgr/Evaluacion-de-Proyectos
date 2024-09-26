import { Fragment } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
function tablaPlanificacion() {
    function createData(hito, fechaIni, fechaFin, cobro, fechaEntrega, entregables) {
        return { hito, fechaIni, fechaFin, cobro, fechaEntrega, entregables };
      }
      const rows = [
        createData('Sprint 1', 159, 6.0, 24, 4.0, 'Modelo ER'),
        createData('Sprint 2', 237, 9.0, 37, 4.3, 'Modelo ER'),
        createData('Sprint 3', 262, 16.0, 24, 6.0, 'Modelo ER'),
        createData('Sprint 4', 305, 3.7, 67, 4.3, 'Modelo ER'),
        createData('Sprint 5', 356, 16.0, 49, 3.9, 'Modelo ER'),
      ];
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
                        <TableCell align="left"></TableCell>
                        <TableCell align="left">NOTAS</TableCell>
                      </TableRow>
                    </TableHead>
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
                          <TableCell align="left">{row.fechaFin}</TableCell>
                          <TableCell align="left">{row.cobro}</TableCell>
                          <TableCell align="lefts">{row.fechaEntrega}</TableCell>
                          <TableCell align="lefts">{row.entregables}</TableCell>
                          <TableCell align="lefts"><Button variant='contained'>Ver</Button></TableCell>
                          <TableCell align="left">{row.cobro}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
    </Fragment>
  );
}

export default tablaPlanificacion;