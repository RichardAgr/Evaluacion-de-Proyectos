import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import ListaDefinitivaN from '../../../components/listaDefinitiva/listaDefinitivaN'
import { getPlanificacionesAceptadas } from "../../../api/getPlanificacionesAceptadas";

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
    }
];

function ListaEmpresasEvaluacionSemanal() {
  const {idGrupo} = useParams()    
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({
    errorMessage: "",
    errorDetails: "",
  });
  const [listaEmpresas, setListaEmpresas] = useState()
  useEffect(() => {
    setLoading(true);
    const fetchEmpresas = async () => {
      try {
        const responseData = await Promise.all([getPlanificacionesAceptadas()]);
        
      if (responseData.error !== undefined && responseData.error !== null) {
            setError({
            errorMessage: "Ha ocurrido un error",
            errorDetails: error.message,
            });
        } else{
            const [lista] = await responseData
            setListaEmpresas(lista);
            console.log(lista);
        }
        
        setLoading(false);
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
        titulo="SELECCIONE UNA EMPRESA PARA VER EL SEGUIMIENTO SEMANAL"
        cabezeraTitulo={null}
        cabezeras={columns}
        datosTabla={listaEmpresas}
        ocultarAtras={false}
        confirmarAtras={false} 
        dirBack={`/`}
        dirForward= {`/homeEstudiante/visCalificar/`}
        mensajeSearch="Buscar Grupo Empresa"
        nombreContador="GRUPOS"
        loading={loading}
        error={error}
    >
        
    </ListaDefinitivaN>
  );
}

export default ListaEmpresasEvaluacionSemanal;