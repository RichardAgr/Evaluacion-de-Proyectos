import { useEffect, useState } from 'react';
import ListaDefinitivaN from '../../../components/listaDefinitiva/listaDefinitivaN';
const columns = [
  {
    field: 'nombreEmpresa',
    headerName: 'Nombre Empresa',
    type: 'string',
    flex: 2,
  },
  {
    field: 'nombreLargo',
    headerName: 'Nombre Empresa largo',
    type: 'string',
    flex: 2,
  },
  {
    field: 'totalEstudiantes',
    headerName: 'Numero de Integrantes',
    type: 'string',
    flex: 2,
  },
];


function EmpresasPorGrupo() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    error: false,
    errorMessage: "",
    errorDetails: "",
  });
  const idGrupo = localStorage.getItem("idGrupo")
  // Initial data fetch with GET request
  useEffect(() => {
    setLoading(true)
    const fetchEmpresas = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8000/api/docente/obtenerEmpresasPorGrupoYDocenteEstudiante?` +
          new URLSearchParams({
            idGrupo
          }),{
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include"
         }
        );

        if (!response.ok) throw new Error('Error fetching data');

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError({
          error: true,
          errorMessage: err.message,
          errorDetails: err,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchEmpresas();
  }, []);
  return (
    <ListaDefinitivaN
      titulo="LISTA DE EMPRESAS"
      cabezeraTitulo={null}
      cabezeras={columns}
      datosTabla={data}
      ocultarAtras={false}
      confirmarAtras={false}
      dirBack="/homeDocente"
      dirForward=""
      mensajeSearch = "Buscar Empresa"
      nombreContador = "Empresas"
      loading={loading}
      error={error}
    />
  );
}

export default EmpresasPorGrupo;
