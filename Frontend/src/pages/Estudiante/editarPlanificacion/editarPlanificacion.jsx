import React, { Fragment, useState } from 'react';
import Footer from '../../../components/Footer/footer.jsx';
import Header from '../../../components/Header/header.jsx';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import BackButtonAndTitle from '../../../components/Buttons/BackButtonAndTitle.jsx';

function EditarPlanificacion() {
  const [rows, setRows] = useState([
    { hito: 'Sprint 1', fechaIni: '2023-01-01', fechaFin: '2023-01-15', cobro: '1000', fechaEntrega: '2023-01-16', entregables: 'Modelo ER' },
    { hito: 'Sprint 2', fechaIni: '2023-01-16', fechaFin: '2023-01-31', cobro: '1500', fechaEntrega: '2023-02-01', entregables: 'Diseño UI' },
    { hito: 'Sprint 3', fechaIni: '2023-02-01', fechaFin: '2023-02-15', cobro: '2000', fechaEntrega: '2023-02-16', entregables: 'Backend API' },
    { hito: 'Sprint 4', fechaIni: '2023-02-16', fechaFin: '2023-02-28', cobro: '1800', fechaEntrega: '2023-03-01', entregables: 'Frontend' },
    { hito: 'Sprint 5', fechaIni: '2023-03-01', fechaFin: '2023-03-15', cobro: '1200', fechaEntrega: '2023-03-16', entregables: 'Testing' },
  ]);

  const addRow = () => {
    const newSprint = rows.length + 1;
    const newRow = { hito: `Sprint ${newSprint}`, fechaIni: '', fechaFin: '', cobro: '', fechaEntrega: '', entregables: '' };
    setRows([...rows, newRow]);
  };

  const deleteRow = (index) => {
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
  };

  const handleCellChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  const handleSave = () => {
    // Implement save functionality here
    console.log('Saving changes:', rows);
  };

  const handleCancel = () => {
    // Implement cancel functionality here
    console.log('Changes discarded');
  };

  return (
    <Fragment>
      <Header />
      <div className='container'>
        <BackButtonAndTitle title="Editar Planificación" />
        <div className='pageBorder'>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="tabla de planificación">
              <TableHead>
                <TableRow>
                  <TableCell>Hito</TableCell>
                  <TableCell align="left">Fecha Inicio</TableCell>
                  <TableCell align="left">Fecha Fin</TableCell>
                  <TableCell align="left">Cobro</TableCell>
                  <TableCell align="left">Fecha Entrega</TableCell>
                  <TableCell align="left">Entregables</TableCell>
                  <TableCell align="left">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    {Object.keys(row).map((field) => (
                      <TableCell key={field} align="left">
                        <TextField
                          value={row[field]}
                          onChange={(e) => handleCellChange(index, field, e.target.value)}
                          type={field.includes('fecha') ? 'date' : 'text'}
                          fullWidth
                          variant="standard"
                        />
                      </TableCell>
                    ))}
                    <TableCell align="left">
                      <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<DeleteIcon />}
                        onClick={() => deleteRow(index)}
                      >
                        Eliminar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<AddIcon />} 
            onClick={addRow}
            style={{ marginTop: '20px' }}
          >
            Añadir Fila
          </Button>
          <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'flex-end', gap: '20px' }}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleSave}
            >
              Guardar
            </Button>
            <Button 
              variant="contained" 
              color="secondary" 
              onClick={handleCancel}
            >
              No Guardar
            </Button>
          </div>
        </div>
      </div>  
      <Footer />
    </Fragment>
  );
}

export default EditarPlanificacion;