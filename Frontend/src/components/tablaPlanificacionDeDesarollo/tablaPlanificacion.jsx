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
  const fechaActual = new Date();
  const dia = fechaActual.getDate();      // Día del mes (1-31)
  const mes = fechaActual.getMonth() + 1; // Mes (0-11, por eso se suma 1 para que sea 1-12)
  const anio = fechaActual.getFullYear(); // Año
  

  console.log(`${dia}/${mes}/${anio}`);   // Imprime la fecha en formato DD/MM/YYYY

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
                      {sprints.map((sprint, index) => {
                        const fechaInicioSprint = new Date(sprint.fechaIni);
                        return (<TableRow
                            key={sprint.hito}
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
                            <TableCell align="left">
                              {fechaActual >= fechaInicioSprint?
                                <Button variant='contained'>Ver Sprint</Button>
                                :
                                <></>
                              }
                            </TableCell>
                            <TableCell align="left"> </TableCell>
                          </TableRow>
                        )})}
                    </TableBody>
                  </Table>
                </TableContainer>
    </Fragment>
  );
}

export default tablaPlanificacion;