import {useState, useEffect } from 'react';
import ListaDefinitivaN from '../../../components/listaDefinitiva/listaDefinitivaN';
import Loading from '../../../components/loading/loading'
import Error from '../../../components/error/error'
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
    renderCell: ({ value }) => (
      <span style={{ color: value ? 'inherit' : 'red' }}>
        {value || 'N/A'}
      </span>
    ),
  },
];

export default function DataTable() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    error: false,
    errorMessage: "",
    errorDetails: "",
  });
  const idGrupo = 1; 
  const gestionGrupo = '2024-2'; 

  const fetchEstudiantes = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/api/docente/listaEstudiantes/${idGrupo}/${gestionGrupo}`,
          {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          
        },
        //credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Error de grupo');
      }

      const data = await response.json();
      setEstudiantes(data); 
    } catch (err) {
      console.error('Error en la solicitud:', err);
      setError({
        error: true,
        errorMessage: err.message,
        errorDetails: err,
      });
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchEstudiantes();
  }, []);


  if (loading) return <Loading />;
  if (error.error) return <Error errorMessage={error.errorMessage} errorDetails={error.errorDetails} />;


  return (
    <ListaDefinitivaN
      titulo="LISTA DE ESTUDIANTES"
      cabezeraTitulo={null}
      cabezeras={columns}
      datosTabla={estudiantes}
      ocultarAtras={false}
      confirmarAtras={false}
      dirBack="/"
      dirForward=""
      mensajeSearch = "Buscar Estudiante o empresa"
      nombreContador = "Estudiantes"
    /> 
  );
}
