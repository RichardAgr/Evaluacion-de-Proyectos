import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Fragment, useState } from 'react';
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
    field: 'equipo',
    headerName: 'Equipo',
    type: 'string',
    width: 90,
  },
  {
    field: 'grupo',
    headerName: 'Grupo',
    type: 'number',
    width: 90,
  },
];

const rows = [
  { id: 1, nombreEstudiante: 'Jon', apellidoPaternoEstudiante: 'Snow', apellidoMaternoEstudiante: 'Stark', equipo: 'prueba1', grupo: 35 },
  { id: 2, nombreEstudiante: 'Cersei', apellidoPaternoEstudiante: 'Lannister', apellidoMaternoEstudiante: 'Baratheon', equipo: 'prueba1', grupo: 42 },
  { id: 3, nombreEstudiante: 'Jaime', apellidoPaternoEstudiante: 'Lannister', apellidoMaternoEstudiante: 'Baratheon', equipo: 'prueba1', grupo: 45 },
  { id: 4, nombreEstudiante: 'Arya', apellidoPaternoEstudiante: 'Stark', apellidoMaternoEstudiante: 'Stark', equipo: 'prueba1', aggrupoe: 16 },
  { id: 5, nombreEstudiante: 'Daenerys', apellidoPaternoEstudiante: 'Targaryen', apellidoMaternoEstudiante: 'Targaryen', equipo: 'prueba1', grupo: null },
  { id: 6, nombreEstudiante: 'Tyrion', apellidoPaternoEstudiante: 'Lannister', apellidoMaternoEstudiante: 'Tytos', equipo: 'prueba2', grupo: 38 },
  { id: 7, nombreEstudiante: 'Bran', apellidoPaternoEstudiante: 'Stark', apellidoMaternoEstudiante: 'Stark', equipo: 'prueba2', grupo: 12 },
  { id: 8, nombreEstudiante: 'Sansa', apellidoPaternoEstudiante: 'Stark', apellidoMaternoEstudiante: 'Tully', equipo: 'prueba2', grupo: 22 },
  { id: 9, nombreEstudiante: 'Brienne', apellidoPaternoEstudiante: 'Tarth', apellidoMaternoEstudiante: 'Unknown', equipo: 'prueba3', grupo: 32 },
  { id: 10, nombreEstudiante: 'Samwell', apellidoPaternoEstudiante: 'Tarly', apellidoMaternoEstudiante: 'Farlund', equipo: 'prueba3', grupo: 27 },
  { id: 11, nombreEstudiante: 'Gendry', apellidoPaternoEstudiante: 'Waters', apellidoMaternoEstudiante: 'Unknown', equipo: 'prueba3', grupo: 28 },
  { id: 12, nombreEstudiante: 'Theon', apellidoPaternoEstudiante: 'Greyjoy', apellidoMaternoEstudiante: 'Harlaw', equipo: 'prueba4', grupo: 30 },
  { id: 13, nombreEstudiante: 'Yara', apellidoPaternoEstudiante: 'Greyjoy', apellidoMaternoEstudiante: 'Harlaw', equipo: 'prueba4', grupo: 35 },
  { id: 14, nombreEstudiante: 'Jorah', apellidoPaternoEstudiante: 'Mormont', apellidoMaternoEstudiante: 'Unknown', equipo: 'prueba4', grupo: 48 },
  { id: 15, nombreEstudiante: 'Daario', apellidoPaternoEstudiante: 'Naharis', apellidoMaternoEstudiante: 'Unknown', equipo: 'prueba5', grupo: 33 },
  { id: 16, nombreEstudiante: 'Missandei', apellidoPaternoEstudiante: 'Unknown', apellidoMaternoEstudiante: 'Unknown', equipo: 'prueba5', grupo: 24 },
  { id: 17, nombreEstudiante: 'Eddard', apellidoPaternoEstudiante: 'Stark', apellidoMaternoEstudiante: 'Tully', equipo: 'prueba5', grupo: 50 },
  { id: 18, nombreEstudiante: 'Robb', apellidoPaternoEstudiante: 'Stark', apellidoMaternoEstudiante: 'Tully', equipo: 'prueba5', grupo: 24 },
  { id: 19, nombreEstudiante: 'Oberyn', apellidoPaternoEstudiante: 'Martell', apellidoMaternoEstudiante: 'Unknown', equipo: 'prueba6', grupo: 45 },
  { id: 20, nombreEstudiante: 'Ellaria', apellidoPaternoEstudiante: 'Sand', apellidoMaternoEstudiante: 'Unknown', equipo: 'prueba6', grupo: 39 },
];


const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable() {
  const [filteredRows, setFilteredRows] = useState(rows); 
  const [searchValue, setSearchValue] = useState(''); 

  const handleSearchChange = (event, value) => {
    setSearchValue(value);
    if (value) {
      const filtered = rows.filter((row) => {
        const fullName = `${row.nombreEstudiante} ${row.apellidoPaternoEstudiante} ${row.apellidoMaternoEstudiante}`.toLowerCase();
        const equipo = row.equipo.toLowerCase();
        const grup = row.grup ? row.grup.toString() : ''; // Si hay un campo grupo
        
        // Realizamos la búsqueda en los campos deseados
        return (
          fullName.includes(value.toLowerCase()) ||
          equipo.includes(value.toLowerCase()) ||
          grup.includes(value.toLowerCase())
        );
      });
      setFilteredRows(filtered);
    } else {
      setFilteredRows(rows); 
    }
  };
  

  return (
    <Fragment>
      <BaseUI>
        <Autocomplete
        freeSolo
        disablePortal
        disableListWrap
        options={[]}
        sx={{ width: 300, marginBottom: '16px' }}
        onInputChange={handleSearchChange}
        renderInput={(params) => <TextField {...params} label="Buscar estudiante, equipo o grupo" />}
        />



        <Paper sx={{ height: 700, width: '100%' }}>
          <DataGrid
            rows={filteredRows} 
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            disableColumnMenu
            sx={{ border: 0 }}
          />
        </Paper>
      </BaseUI>
    </Fragment>
  );
}
