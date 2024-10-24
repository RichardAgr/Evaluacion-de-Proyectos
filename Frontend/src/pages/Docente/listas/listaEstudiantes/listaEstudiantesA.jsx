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
  { id: 1, nombreEstudiante: 'Jon', apellidoPaternoEstudiante: 'Snow', apellidoMaternoEstudiante: 'Stark', equipo: 'prueba1', grupo: 35 },
  { id: 2, nombreEstudiante: 'Cersei', apellidoPaternoEstudiante: 'Lannister', apellidoMaternoEstudiante: 'Baratheon', equipo: 'prueba1', grupo: 42 },
  { id: 3, nombreEstudiante: 'Jaime', apellidoPaternoEstudiante: 'Lannister', apellidoMaternoEstudiante: 'Baratheon', equipo: 'prueba1', grupo: 45 },
  { id: 4, nombreEstudiante: 'Arya', apellidoPaternoEstudiante: 'Stark', apellidoMaternoEstudiante: 'Stark', equipo: 'prueba1', grupo: 16 }, // Asegúrate de que sea 'grupo' en lugar de 'aggrupoe'
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

const paginationModel = { page: 0, pageSize: 20 };

export default function DataTable() {
  const [filteredRows, setFilteredRows] = useState(rows); 
  const [searchValue, setSearchValue] = useState(''); 
  const [estudiantes, setEstudiantes] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const [hasFetchedData, setHasFetchedData] = useState(false);
  const idGrupo = 1; // Hardcodeado
  const gestionGrupo = '2024-2'; // Hardcodeado



  
  const fetchEstudiantes = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/grupo/estudiantes/${idGrupo}/${gestionGrupo}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error de grupo');
      }

      const data = await response.json();
      if (!hasFetchedData) {
        setEstudiantes(data);
        setFilteredRows(data);
        setHasFetchedData(true); // Indica que los datos han sido cargados
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEstudiantes();
  }, []);

  const handleSearchChange = (event, value) => {
    setSearchValue(value);
    if (value) {
      const filtered = estudiantes.filter((row) => {
        const fullName = `${row.nombreEstudiante} ${row.apellidoPaternoEstudiante} ${row.apellidoMaternoEstudiante}`.toLowerCase();
        const equipo = row.equipo.toLowerCase();
        const grup = row.grupo ? row.grupo.toString() : '';
        
        return (
          fullName.includes(value.toLowerCase()) ||
          equipo.includes(value.toLowerCase()) ||
          grup.includes(value.toLowerCase())
        );
      });
      setFilteredRows(filtered);
    } else {
      setFilteredRows(estudiantes);
    }
  };

  if (loading) return <div>Cargando...</div>; // Manejo de carga
  if (error) return <div>Error: {error}</div>; // Manejo de errores


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
            getRowId={(row) => row.idEstudiante} 
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
