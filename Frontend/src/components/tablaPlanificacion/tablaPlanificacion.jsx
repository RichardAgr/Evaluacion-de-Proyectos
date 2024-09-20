import { Fragment } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
function tablaPlanificacion({sprints}) {
  function createData(hito, fechaIni, fechaFin, cobro, fechaEntrega, entregables) {
      return { hito, fechaIni, fechaFin, cobro, fechaEntrega, entregables };
  }
  let contador = 0;
  const sprints2 = [
    sprints.map((sprint)=>{
      createData('SPRINT '+contador+1, sprint.fechaIni, sprint.fechaFin, sprint.cobro, sprint.fechaEntrega)
    })
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
                      {sprints2.map((sprint) => (
                        <TableRow
                          key={sprint.hito}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {sprint.hito}
                          </TableCell>
                          <TableCell align="left">{sprint.fechaIni}</TableCell>
                          <TableCell align="left">{sprint.fechaFin}</TableCell>
                          <TableCell align="left">{sprint.cobro}</TableCell>
                          <TableCell align="left">{sprint.fechaEntrega}</TableCell>
                          <TableCell align="left">{sprint.entregables}</TableCell>
                          <TableCell align="left">{sprint.cobro}</TableCell>
                          <TableCell align="left"><Button variant='contained'>Ver</Button></TableCell>
                          <TableCell align="left"> </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
    </Fragment>
  );
}

export default tablaPlanificacion;