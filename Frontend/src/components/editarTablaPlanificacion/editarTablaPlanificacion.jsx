/* eslint-disable react/prop-types */
import { Fragment, useEffect, useState } from 'react';
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
  Box,
  Alert,
  AlertTitle
} from '@mui/material';
import PopUpDialog from '../popUPDialog/popUpDialog';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

export default function EditarPlanificacion({planificacionData, idEmpresa}) {
  const [rows, setRows] = useState([]);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [openAlertS, setOpenAlertS] = useState(false);
  const [openAlertE, setOpenAlertE] = useState(false);
  const handleCancel = () => {
    setOpenCancelDialog(true);
  };
  const [openSaveDialog, setOpenSaveDialog] = useState(false);
  const handleSave = () => {
    setOpenSaveDialog(true);
  };

  useEffect(()=>{
      const newRows= planificacionData.sprints.map((sprint, index)=>{
          return {
              hito: `SPRINT `+(index+1), 
              fechaIni: sprint.fechaIni, 
              fechaFin: sprint.fechaFin, 
              cobro: sprint.cobro, 
              fechaEntrega: sprint.fechaEntrega, 
              entregables: sprint.entregables,
          };
      })
      setRows(newRows);
  },[planificacionData])
  const addRow = () => {
    const newSprint = rows.length + 1;
    const newRow = {
      hito: `SPRINT ${newSprint}`, 
      fechaIni: '', 
      fechaFin: '', 
      cobro: '', 
      fechaEntrega: '', 
      entregables: ''
    };
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
  const subir = async () => {
    for (const row of rows) {
      if (Object.values(row).some(value => value === "" || value === null)) {
        console.error("Hay campos vacíos en uno de los sprints.");
        setOpenAlert(true);
        return;
      }
    }

    const date = new Date();
    const dia = String(date.getDate()).padStart(2, '0');
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    const anio = date.getFullYear();
    const horas = String(date.getHours()).padStart(2, '0');
    const minutos = String(date.getMinutes()).padStart(2, '0');
    const segundos = String(date.getSeconds()).padStart(2, '0');
    
    const data = {
      idEmpresa: Number(idEmpresa),
      comentarioDocente: String(planificacionData.comentarioDocente ? planificacionData.comentarioDocente : 'Falta que comente el docente'),
      notaPlanificacion: Number(planificacionData.notaPlanificacion),
      aceptada: Boolean(planificacionData.aceptada), 
      fechaEntrega: `${anio}-${mes}-${dia} ${horas}:${minutos}:${segundos}`, 
      sprints: rows.map((row) => ({
        fechaIni: row.fechaIni,
        fechaFin: row.fechaFin,
        cobro: Number(row.cobro),
        fechaEntrega: row.fechaEntrega,
        entregables: row.entregables,
      })),
    };

    console.log(data);

    try {
      const response = await fetch('http://localhost:8000/api/planificacion/guardar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const responseData = await response.json();
      if (responseData.success) {
        console.log('Los datos se subieron correctamente.');
        setOpenAlertS(true);
      }else{
        setOpenAlertS(true);
      }
      console.log('Respuesta del servidor:', responseData);
    } catch (error) {
      setOpenAlertE(true);
      console.error('Error en la solicitud:', error);
    }
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };
  const handleCloseAlertS = () => {
    setOpenAlertS(false);
  };
  
  const handleCloseAlertE= () => {
    setOpenAlertE(false);
  };
  return (
    <Fragment>
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
                              value={row[field] ?? ""}
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
            color="secondary" 
            onClick={handleCancel}
            aria-label="Descartar cambios"
        >
            No Guardar
        </Button>
        <Button 
            variant="contained" 
            color="primary" 
            onClick={handleSave}
            aria-label="Guardar cambios"
        >
            Guardar
        </Button>
        </div>
      </Box>
      <PopUpDialog 
        openDialog= {openCancelDialog} 
        setOpenDialog= {setOpenCancelDialog}
        especial={() => window.location.reload()}
        titleDialog={'¿Estás seguro de que quieres descartar los cambios?, esta accion te llevara atras'}
        textDialog={'Esta acción no se puede deshacer. Todos los cambios realizados se perderán.'}
      ></PopUpDialog>
      <PopUpDialog 
        openDialog= {openSaveDialog} 
        setOpenDialog= {setOpenSaveDialog}
        especial = {subir}
        titleDialog={'¿Estás seguro de que quieres guardar los cambios?'}
        textDialog={'Esta acción guardará todos los cambios realizados en la planificación.'}
      ></PopUpDialog>
      {openAlert?
        <Alert 
          severity="warning" 
          onClose={handleCloseAlert} 
          role="alert" // Asegúrate de que tiene el rol correcto
        >
          <AlertTitle>Error</AlertTitle>
          Ninguno de los campos debe estar vacío
        </Alert>
        :
        <></>
      }
      {openAlertS?
        <Alert severity="success"
        role="alert"
        onClose={handleCloseAlertS} 
        >
          <AlertTitle>Success</AlertTitle>
          Se subio los datos correctamente.
        </Alert>
        :
        <></>
      }
      {openAlertE?
        <Alert 
          severity="error" 
          onClose={handleCloseAlertE} 
          role="alert" // Asegúrate de que tiene el rol correcto
        >
          <AlertTitle>Error</AlertTitle>
          Hubo un Error al subir los datos, pruebe mas tarde.
        </Alert>
        :
        <></>
      }      
    </Fragment>
  );
}