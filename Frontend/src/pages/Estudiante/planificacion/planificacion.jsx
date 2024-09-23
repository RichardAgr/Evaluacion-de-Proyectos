import { Fragment } from 'react';
import Footer from '../../../components/Footer/footer.jsx'
import Header from '../../../components/Header/header.jsx'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ComentarioNota from '../../../components/comentarioNota/comentarioNota.jsx';
function planificacion() {
  function createData(hito, fechaIni, fechaFin, cobro, fechaEntrega, entregables) {
    return { hito, fechaIni, fechaFin, cobro, fechaEntrega, entregables };
  }
  const comentario = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis dolore doloribus iusto suscipit reiciendis autem libero quae, voluptates, iste dignissimos, nihil quos architecto. At sapiente deleniti, molestias assumenda omnis hic!';
  const nota = 50;
  const rows = [
    createData('Sprint 1', 159, 6.0, 24, 4.0, 'Modelo ER'),
    createData('Sprint 2', 237, 9.0, 37, 4.3, 'Modelo ER'),
    createData('Sprint 3', 262, 16.0, 24, 6.0, 'Modelo ER'),
    createData('Sprint 4', 305, 3.7, 67, 4.3, 'Modelo ER'),
    createData('Sprint 5', 356, 16.0, 49, 3.9, 'Modelo ER'),
  ];
  function goBack() {
    window.history.back();
  }
  return (
    <Fragment>
      <Header></Header>
        <div className='box'>
            <div className='container'>
              <Button variant='contained' onClick={goBack}>Atras</Button>
              <h1>Planificacion</h1>
              <div className='pageBorder'>
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
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <ComentarioNota comentario={comentario} nota = {nota}></ComentarioNota>
              </div>
            </div>
        </div>  
      <Footer></Footer>
    </Fragment>
  );
}

export default planificacion;