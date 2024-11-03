import { useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import BaseUI from '../../../../components/baseUI/baseUI';
import { TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  {
    field: 'nombreLargo',
    headerName: 'Nombre Largo',
    sortable: true,
    flex: 2,
    valueGetter: (value,row) => row.nombreLargo,
  },
  {
    field: 'nombreEmpresa',
    headerName: 'Nombre Corto',
    sortable: true,
    flex: 2,
    valueGetter: (value,row) => row.nombreEmpresa,
  },
  {
    field: 'totalEstudiantes',
    headerName: 'Número de Integrantes',
    sortable: true,
    flex: 2,
    valueGetter: (value,row) => row.totalEstudiantes || 0,
  },
];

function EmpresasPorGrupo() {
  const [empresas, setEmpresas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [notFound, setNotFound] = useState('');
  const idDocente = 1;
  const gestionGrupo = '2024-2';

  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/docente/obtenerEmpresasPorGrupoYDocente?` +
            new URLSearchParams({
              idDocente,
              gestionGrupo,
            }).toString(),
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error('Error de grupo');
        }

        const data = await response.json();
        setEmpresas(data);
      } catch (error) {
        console.error('Error en la solicitud:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEmpresas();
  }, []);

  const paginationModel = { page: 0, pageSize: 20 };

  const filteredEmpresas = empresas.filter((empresa) => {
    return (
      empresa.nombreLargo.toLowerCase().includes(searchValue.toLowerCase()) ||
      empresa.nombreEmpresa.toLowerCase().includes(searchValue.toLowerCase()) ||
      empresa.totalEstudiantes.toString().includes(searchValue)
    );
  });

  useEffect(() => {
    if (filteredEmpresas.length === 0 && searchValue.trim() !== '') {
      setNotFound('No se encontraron resultados que coincidan con la búsqueda');
    } else {
      setNotFound('');
    }
  }, [searchValue, filteredEmpresas.length]);

  return (
    <>
      <BaseUI
        titulo={"LISTA DE GRUPO EMPRESAS"}
        ocultarAtras={false}
        confirmarAtras={false}
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
              renderInput={(params) => (
                <TextField {...params} label="Buscar por Nombre Largo o Nombre Corto" />
              )}
            />
            <SearchIcon sx={{ marginLeft: '15px', color: 'grey.500', fontSize: 35 }} />
          </div>
          <h2>{empresas.length} Empresas</h2>
        </div>

        <Paper sx={{ height: 700, width: '100%' }}>
          {loading ? (
            <p>Cargando...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : empresas.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Alert severity="info" style={{ width: 'fit-content', textAlign: 'center' }}>
                No hay empresas inscritas en este momento.
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
                  rows={filteredEmpresas}
                  columns={columns}
                  getRowId={(row) => row.nombreEmpresa}
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
    </>
  );
}

export default EmpresasPorGrupo;
