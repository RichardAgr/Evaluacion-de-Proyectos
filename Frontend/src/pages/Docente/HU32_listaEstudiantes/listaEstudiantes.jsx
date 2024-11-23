import {useState, useEffect } from 'react';
import ListaDefinitivaN from '../../../components/listaDefinitiva/listaDefinitivaN';
import { useParams } from 'react-router-dom';
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
    headerName: 'Grupo Empresa',
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

  const {idGrupo, gestionGrupo} = useParams()

  const fetchEstudiantes = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/docente/listaEstudiantes', {
        method: 'GET',  // El método de la solicitud, si es GET o POST, depende de tu API
        credentials: 'include',  // Incluye las cookies de sesión si es necesario
        // Si estás enviando parámetros de consulta:
        // headers: {
        //   'Content-Type': 'application/json',  // Dependiendo de tu API
        // },
        // body: JSON.stringify({idGrupo, gestionGrupo}),  // Si necesitas enviar datos en el cuerpo de la solicitud
      });
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
      loading={loading}
      error={error}
    /> 
  );
}
