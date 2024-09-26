import React, { Fragment, useState } from 'react';
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
import Header from '../../../components/Header/header.jsx';
import Footer from '../../../components/Footer/footer.jsx';
import BackButtonAndTitle from '../../../components/Buttons/BackButtonAndTitle.jsx';

function ValidarPlanificacion() {
  const [openValidateDialog, setOpenValidateDialog] = useState(false);
  const [openRejectDialog, setOpenRejectDialog] = useState(false);
  const [groupComment, setGroupComment] = useState('');
  const [privateComment, setPrivateComment] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  const rows = [
    { hito: 'Sprint 1', fechaIni: '2023-07-01', fechaFin: '2023-07-15', cobro: 1000, fechaEntrega: '2023-07-16', entregables: 'Modelo ER' },
    { hito: 'Sprint 2', fechaIni: '2023-07-16', fechaFin: '2023-07-31', cobro: 1500, fechaEntrega: '2023-08-01', entregables: 'Diseño UI' },
    { hito: 'Sprint 3', fechaIni: '2023-08-01', fechaFin: '2023-08-15', cobro: 2000, fechaEntrega: '2023-08-16', entregables: 'Backend API' },
    { hito: 'Sprint 4', fechaIni: '2023-08-16', fechaFin: '2023-08-31', cobro: 1800, fechaEntrega: '2023-09-01', entregables: 'Frontend' },
    { hito: 'Sprint 5', fechaIni: '2023-09-01', fechaFin: '2023-09-15', cobro: 1200, fechaEntrega: '2023-09-16', entregables: 'Testing' },
  ];

  const handleValidate = () => {
    setOpenValidateDialog(true);
  };

  const handleReject = () => {
    setOpenRejectDialog(true);
  };

  const confirmValidate = () => {
    setOpenValidateDialog(false);
    setSnackbar({ open: true, message: 'Planificación validada con éxito' });
    // Here you would typically send the validation to your backend
  };

  const confirmReject = () => {
    setOpenRejectDialog(false);
    setSnackbar({ open: true, message: 'Planificación rechazada' });
    // Here you would typically send the rejection and comments to your backend
  };

  return (
    <Fragment>
      <Header />
      <div className='container'>
        <BackButtonAndTitle title="Validar Planificación" />
        <Box className='pageBorder' sx={{ padding: 3 }}>
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
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.hito}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">{row.hito}</TableCell>
                    <TableCell align="left">{row.fechaIni}</TableCell>
                    <TableCell align="left">{row.fechaFin}</TableCell>
                    <TableCell align="left">{row.cobro}</TableCell>
                    <TableCell align="left">{row.fechaEntrega}</TableCell>
                    <TableCell align="left">{row.entregables}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TextField
            label="Comentarios para el grupo"
            multiline
            rows={4}
            value={groupComment}
            onChange={(e) => setGroupComment(e.target.value)}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Comentarios privados"
            multiline
            rows={4}
            value={privateComment}
            onChange={(e) => setPrivateComment(e.target.value)}
            fullWidth
            margin="normal"
          />

<div style={{ marginTop: '40px', display: 'flex', justifyContent: 'flex-end', gap: '20px' }}>
            <Button variant="contained" color="primary" onClick={handleValidate}>
              Validar Planificación
            </Button>
            <Button variant="contained" color="secondary" onClick={handleReject}>
              Rechazar Planificación
            </Button>
          </div>
          </Box>
      </div>

      <Dialog open={openValidateDialog} onClose={() => setOpenValidateDialog(false)}>
        <DialogTitle>Confirmar Validación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Está seguro de que desea validar esta planificación?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenValidateDialog(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={confirmValidate} color="primary" autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openRejectDialog} onClose={() => setOpenRejectDialog(false)}>
        <DialogTitle>Confirmar Rechazo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Está seguro de que desea rechazar esta planificación?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRejectDialog(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={confirmReject} color="secondary" autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />

      <Footer />
    </Fragment>
  );
}

export default ValidarPlanificacion;