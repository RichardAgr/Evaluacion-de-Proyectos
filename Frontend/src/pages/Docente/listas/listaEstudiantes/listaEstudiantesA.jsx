import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Fragment, useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';  
import TextField from '@mui/material/TextField';
import BaseUI from '../../../../components/baseUI/baseUI';
import Alert from '@mui/material/Alert';
import SearchIcon from '@mui/icons-material/Search';

const columns = [
  {
    field: 'nombreCompleto',
    headerName: 'Nombre',
    sortable: true,
    flex: 2,
    valueGetter: (value, row) => `${row.nombreEstudiante || ''} ${row.apellidoPaternoEstudiante || ''} ${row.apellidoMaternoEstudiante || ''}`,
  },
  {
    field: 'nombreEmpresa',
    headerName: 'Equipo',
    type: 'string',
    flex: 2,
  },
];

export default function DataTable() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchValue, setSearchValue] = useState(''); // Estado para el valor de búsqueda
  const [notFound, setNotFound] = useState(''); // Estado para almacenar el mensaje de "no encontrado"

  const idGrupo = 1; 
  const gestionGrupo = '2024-2'; 

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
      setEstudiantes(data); 
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

  const paginationModel = { page: 0, pageSize: 20 };

  // Filtrar los estudiantes según el valor de búsqueda
  const filteredEstudiantes = estudiantes.filter((estudiante) => {
    const nombreCompleto = `${estudiante.nombreEstudiante} ${estudiante.apellidoPaternoEstudiante} ${estudiante.apellidoMaternoEstudiante}`.toLowerCase();
    const nombreEmpresa = estudiante.nombreEmpresa?.toLowerCase() || '';
    return (
      nombreCompleto.includes(searchValue.toLowerCase()) || 
      nombreEmpresa.includes(searchValue.toLowerCase())
    );
  });

  // Verificar si no se encontró ningún estudiante, equipo o grupo
  useEffect(() => {
    if (filteredEstudiantes.length === 0) {
      if (searchValue.trim() === '') {
        setNotFound(''); // No hay búsqueda activa
      } else {
        setNotFound('No se encontraron resultados que coincidan con la búsqueda');
      }
    } else {
      setNotFound(''); // Resetear si se encuentran resultados
    }
  }, [searchValue, filteredEstudiantes.length]);

  return (
    <Fragment>
      <BaseUI
        titulo={"LISTA DE ESTUDIANTES"}
        ocultarAtras={false} 
        confirmarAtras={true} 
        dirBack={`/`}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', marginTop: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Autocomplete
              freeSolo
              disablePortal
              disableListWrap
              options={[]}
              inputValue={searchValue} 
              onInputChange={(event, newValue) => setSearchValue(newValue)} 
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Buscar estudiante, equipo o grupo" />}
            />
            <SearchIcon sx={{ marginLeft: '15px', color: 'grey.500', fontSize:35 }} />
          </div>

           <h2> {estudiantes.length} Estudiantes</h2>
        </div>


        <Paper sx={{ height: 700, width: '100%' }}>
            {loading ? (
              <p>Cargando...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : estudiantes.length === 0 ? ( // Verificamos si no hay estudiantes
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Alert severity="info" style={{ width: 'fit-content', textAlign: 'center' }}>
                  No hay estudiantes inscritos en este momento.
                </Alert>
              </div>
            ) : (
              <>
                {notFound ? (
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <Alert severity="warning" style={{ width: 'fit-content', textAlign: 'center' }}>
                      {notFound}
                    </Alert>
                  </div>
                ) : (
                  <DataGrid
                    rows={filteredEstudiantes} 
                    columns={columns}
                    getRowId={(row) => row.idEstudiante}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[2, 10]}
                    disableColumnMenu
                    isRowSelectable={() => false}
                    sx={{ border: 0 }}
                    sortingOrder={['asc', 'desc']} 
                  />
                )}
              </>
            )}
          </Paper>

      </BaseUI>
    </Fragment>
  );
}
