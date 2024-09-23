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
  Box
} from '@mui/material';
import PopUpDialog from '../popUPDialog/popUpDialog';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

export default function EditarPlanificacion({sprints, changeTable}) {
  const [rows, setRows] = useState([]);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const handleCancel = () => {
    setOpenCancelDialog(true);
  };
  const [openSaveDialog, setOpenSaveDialog] = useState(false);
  const handleSave = () => {
    setOpenSaveDialog(true);
  };

  useEffect(()=>{
      const newRows= sprints.map((sprint, index)=>{
          return { 
              hito: `SPRINT `+(index+1), 
              fechaIni: sprint.fechaIni, 
              fechaFin: sprint.fechaFin, 
              cobro: sprint.cobro, 
              fechaEntrega: sprint.fechaEntrega, 
              entregables: sprint.entregables 
          };
      })
      setRows(newRows);
  },[sprints])
  const addRow = () => {
    const newSprint = rows.length + 1;
    const newRow = { hito: `SPRINT ${newSprint}`, fechaIni: '', fechaFin: '', cobro: '', fechaEntrega: '', entregables: '' };
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
      <PopUpDialog 
        openDialog= {openCancelDialog} 
        setOpenDialog= {setOpenCancelDialog}
        especial = {changeTable}
        titleDialog={'¿Estás seguro de que quieres descartar los cambios?'}
        textDialog={'Esta acción no se puede deshacer. Todos los cambios realizados se perderán.'}
      ></PopUpDialog>
      <PopUpDialog 
        openDialog= {openSaveDialog} 
        setOpenDialog= {setOpenSaveDialog}
        especial = {changeTable}
        titleDialog={'¿Estás seguro de que quieres guardar los cambios?'}
        textDialog={'Esta acción guardará todos los cambios realizados en la planificación.'}
      ></PopUpDialog>
    </Fragment>
  );
}