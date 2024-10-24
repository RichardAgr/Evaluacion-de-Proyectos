import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Fragment, useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';  
import TextField from '@mui/material/TextField';
import BaseUI from '../../../../components/baseUI/baseUI';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  {
    field: 'nombreCompleto',
    headerName: 'Nombre',
    sortable: true,
    width: 160,
    valueGetter: (value, row) => `${row.nombreEstudiante || ''} ${row.apellidoPaternoEstudiante || ''} ${row.apellidoMaternoEstudiante || ''}`,
  },
  {
    field: 'nombreEmpresa',
    headerName: 'Equipo',
    type: 'string',
    width: 90,
  },
  {
    field: 'numGrupo',
    headerName: 'Grupo',
    type: 'number',
    width: 90,
  },
];

const rows = [
  { id: 1, nombreEstudiante: 'Jon', apellidoPaternoEstudiante: 'Snow', apellidoMaternoEstudiante: 'Stark', nombreEmpresa: 'prueba1', grupo: 35 },
  { id: 2, nombreEstudiante: 'Cersei', apellidoPaternoEstudiante: 'Lannister', apellidoMaternoEstudiante: 'Baratheon', nombreEmpresa: 'prueba1', grupo: 42 },
  { id: 3, nombreEstudiante: 'Jaime', apellidoPaternoEstudiante: 'Lannister', apellidoMaternoEstudiante: 'Baratheon', nombreEmpresa: 'prueba1', grupo: 45 },
  { id: 4, nombreEstudiante: 'Arya', apellidoPaternoEstudiante: 'Stark', apellidoMaternoEstudiante: 'Stark', nombreEmpresa: 'prueba1', grupo: 16 }, // Asegúrate de que sea 'grupo' en lugar de 'aggrupoe'
  { id: 5, nombreEstudiante: 'Daenerys', apellidoPaternoEstudiante: 'Targaryen', apellidoMaternoEstudiante: 'Targaryen', nombreEmpresa: 'prueba1', grupo: null },
  { id: 6, nombreEstudiante: 'Tyrion', apellidoPaternoEstudiante: 'Lannister', apellidoMaternoEstudiante: 'Tytos', nombreEmpresa: 'prueba2', grupo: 38 },
  { id: 7, nombreEstudiante: 'Bran', apellidoPaternoEstudiante: 'Stark', apellidoMaternoEstudiante: 'Stark', nombreEmpresa: 'prueba2', grupo: 12 },
  { id: 8, nombreEstudiante: 'Sansa', apellidoPaternoEstudiante: 'Stark', apellidoMaternoEstudiante: 'Tully', nombreEmpresa: 'prueba2', grupo: 22 },
  { id: 9, nombreEstudiante: 'Brienne', apellidoPaternoEstudiante: 'Tarth', apellidoMaternoEstudiante: 'Unknown', nombreEmpresa: 'prueba3', grupo: 32 },
  { id: 10, nombreEstudiante: 'Samwell', apellidoPaternoEstudiante: 'Tarly', apellidoMaternoEstudiante: 'Farlund', nombreEmpresa: 'prueba3', grupo: 27 },
  { id: 11, nombreEstudiante: 'Gendry', apellidoPaternoEstudiante: 'Waters', apellidoMaternoEstudiante: 'Unknown', nombreEmpresa: 'prueba3', grupo: 28 },
  { id: 12, nombreEstudiante: 'Theon', apellidoPaternoEstudiante: 'Greyjoy', apellidoMaternoEstudiante: 'Harlaw', nombreEmpresa: 'prueba4', grupo: 30 },
  { id: 13, nombreEstudiante: 'Yara', apellidoPaternoEstudiante: 'Greyjoy', apellidoMaternoEstudiante: 'Harlaw', nombreEmpresa: 'prueba4', grupo: 35 },
  { id: 14, nombreEstudiante: 'Jorah', apellidoPaternoEstudiante: 'Mormont', apellidoMaternoEstudiante: 'Unknown', nombreEmpresa: 'prueba4', grupo: 48 },
  { id: 15, nombreEstudiante: 'Daario', apellidoPaternoEstudiante: 'Naharis', apellidoMaternoEstudiante: 'Unknown', nombreEmpresa: 'prueba5', grupo: 33 },
  { id: 16, nombreEstudiante: 'Missandei', apellidoPaternoEstudiante: 'Unknown', apellidoMaternoEstudiante: 'Unknown', nombreEmpresa: 'prueba5', grupo: 24 },
  { id: 17, nombreEstudiante: 'Eddard', apellidoPaternoEstudiante: 'Stark', apellidoMaternoEstudiante: 'Tully', nombreEmpresa: 'prueba5', grupo: 50 },
  { id: 18, nombreEstudiante: 'Robb', apellidoPaternoEstudiante: 'Stark', apellidoMaternoEstudiante: 'Tully', nombreEmpresa: 'prueba5', grupo: 24 },
  { id: 19, nombreEstudiante: 'Oberyn', apellidoPaternoEstudiante: 'Martell', apellidoMaternoEstudiante: 'Unknown', nombreEmpresa: 'prueba6', grupo: 45 },
  { id: 20, nombreEstudiante: 'Ellaria', apellidoPaternoEstudiante: 'Sand', apellidoMaternoEstudiante: 'Unknown', nombreEmpresa: 'prueba6', grupo: 39 },
];

const paginationModel = { page: 0, pageSize: 20 };

export default function DataTable() {
  const idGrupo = 1; // Hardcodeado
  const gestionGrupo = '2024-2'; // Hardcodeado




  return (
    <Fragment>
      <BaseUI>
        <Autocomplete
          freeSolo
          disablePortal
          disableListWrap
          options={[]}
          sx={{ width: 300, marginBottom: '16px' }}
          renderInput={(params) => <TextField {...params} label="Buscar estudiante, equipo o grupo" />}
        />

        <Paper sx={{ height: 700, width: '100%' }}>
          <DataGrid
            rows={rows} 
            columns={columns}
            // getRowId={(row) => row.idEstudiante} 
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[2, 10]}
            disableColumnMenu
            sx={{ border: 0 }}
            sortingOrder={['asc', 'desc']} // Orden ascendente y descendente
          />
        </Paper>
      </BaseUI>
    </Fragment>
  );
}
