import { Fragment, useState } from 'react';
import Footer from '../../../components/Footer/footer';
import Header from '../../../components/Header/header';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Box
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '@mui/material/Alert';

export default function EditarPlanificacion() {
  const [rows, setRows] = useState([
    { hito: 'Sprint 1', fechaIni: '2023-01-01', fechaFin: '2023-01-15', cobro: '1000', fechaEntrega: '2023-01-16', entregables: 'Modelo ER' },
    { hito: 'Sprint 2', fechaIni: '2023-01-16', fechaFin: '2023-01-31', cobro: '1500', fechaEntrega: '2023-02-01', entregables: 'Diseño UI' },
    { hito: 'Sprint 3', fechaIni: '2023-02-01', fechaFin: '2023-02-15', cobro: '2000', fechaEntrega: '2023-02-16', entregables: 'Backend API' },
    { hito: 'Sprint 4', fechaIni: '2023-02-16', fechaFin: '2023-02-28', cobro: '1800', fechaEntrega: '2023-03-01', entregables: 'Frontend' },
    { hito: 'Sprint 5', fechaIni: '2023-03-01', fechaFin: '2023-03-15', cobro: '1200', fechaEntrega: '2023-03-16', entregables: 'Testing' },
  ]);

  const [openSaveDialog, setOpenSaveDialog] = useState(false);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

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
    setOpenSaveDialog(true);
  };

  const handleConfirmSave = () => {
    // Implementar funcionalidad de guardado
    console.log('Saving changes:', rows);
    setOpenSaveDialog(false);
    setOpenSnackbar(true);
  };

  const handleCancel = () => {
    setOpenCancelDialog(true);
  };

  const handleConfirmCancel = () => {
    // Implementar funcionalidad de cancelar, probablemente solo navegar a la anterior pagina
    console.log('Changes discarded');
    setOpenCancelDialog(false);
    window.history.back();
  };

  const handleCloseDialog = () => {
    setOpenSaveDialog(false);
    setOpenCancelDialog(false);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Fragment>
      <Header />
      <div className='box'>
        <div className='container'>
          <h1>Modificando Planificacion</h1>
          <div className='pageBorder'>
            <div className='pageBorder_interior'>
            <Box sx={{ padding: 3 }}>
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
                      <TableCell align="left"></TableCell>
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
                              inputProps={{
                                'aria-label': `${field} for ${row.hito}`,
                              }}
                            />
                          </TableCell>
                        ))}
                        <TableCell align="left">
                          <DeleteIcon
                            className='iconsSec'
                            onClick={() => deleteRow(index)}
                            aria-label={`Eliminar ${row.hito}`}
                          ></DeleteIcon>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <AddIcon
              className='icons'
                onClick={addRow}
                style={{ marginTop: '20px' }}
                aria-label="Añadir nueva fila"
              ></AddIcon>
              <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'flex-end', gap: '20px' }}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={handleSave}
                  aria-label="Guardar cambios"
                >
                  Guardar
                </Button>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  onClick={handleCancel}
                  aria-label="Descartar cambios"
                >
                  No Guardar
                </Button>
              </div>
            </Box>
            </div> 
          </div> 
        </div>   
      </div> 
      <Footer />














      <Dialog
        open={openSaveDialog}
        onClose={handleCloseDialog}
        aria-labelledby="save-dialog-title"
        aria-describedby="save-dialog-description"
      >
        <DialogTitle id="save-dialog-title">
          {"¿Estás seguro de que quieres guardar los cambios?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="save-dialog-description">
            Esta acción guardará todos los cambios realizados en la planificación.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleConfirmSave} autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openCancelDialog}
        onClose={handleCloseDialog}
        aria-labelledby="cancel-dialog-title"
        aria-describedby="cancel-dialog-description"
      >
        <DialogTitle id="cancel-dialog-title">
          {"¿Estás seguro de que quieres descartar los cambios?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="cancel-dialog-description">
            Esta acción no se puede deshacer. Todos los cambios realizados se perderán.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleConfirmCancel} autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Los cambios se han guardado con éxito!
        </Alert>
      </Snackbar>
    </Fragment>
  );
}