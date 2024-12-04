import { useEffect, useState } from 'react';
import ListaDefinitivaN from '../../../components/listaDefinitiva/listaDefinitivaN';
import {fetchEmpresas} from '../../../api/listas/getEmpresas'
import Cookies from 'js-cookie';
import { decrypt } from '../../../api/decrypt';
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

  // Initial data fetch with GET request
  useEffect(() => {
    setLoading(true)
    const fetchEmpresasDatos = async () => {
      setLoading(true);
      try {
        const userRole = Cookies.get('random');
        const decryptedRole = decrypt(userRole);
        let url = '';
        if(decryptedRole === 'docente'){
            url = '/docente/obtenerEmpresasPorGrupoYDocente?'
          }
        else{ 
            url = '/estudiante/obtenerEmpresasPorGrupoYDocenteEstudiante?'
          }
        console.log(url);
        const result = await fetchEmpresas(url);
        if(!result.ok){
          console.log(result);
          setData(result);
          console.log('la data');
          console.log(data);
        }else {
          const errorMessage = result.error;
          console.log(errorMessage);
            setError({
              error: true,
              errorMessage: errorMessage,
              errorDetails: errorMessage,
            });
          }
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
    fetchEmpresasDatos();
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
