import { useState, useEffect } from 'react';
import { getPlanificacionesAceptadas } from '../../../api/getPlanificacionesAceptadas';
import ListaDefinitivaN from '../../../components/listaDefinitiva/listaDefinitivaN';
import { useParams } from 'react-router-dom';
import BaseUI from '../../../components/baseUI/baseUI';
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
  ];

function ListaEmpresaSprints() {
    const { idGrupo } = useParams()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({
        error:false,
        errorMessage: "",
        errorDetails: "",
    });
    const [listaEmpresas, setListaEmpresas] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const [lista] = await Promise.all([getPlanificacionesAceptadas()]);
            setListaEmpresas(lista);
            console.log(lista);
          } catch (error) {
            console.error("Error en la solicitud:", error.message);
            setError({
              error:true,
              errorMessage: "Ha ocurrido un error",
              errorDetails: error.message,
            });
          } finally {
            setLoading(false);
          }
        };
        fetchData();
      }, []);
  if(listaEmpresas.length === 0) return (
    <BaseUI
        titulo={'SELECCIONE UNA EMPRESA PARA CALIFICAR'}
        ocultarAtras={false}
        confirmarAtras={false}
        dirBack={`/homeGrupo/${idGrupo}/listaEmpresaCalificarSprints/`}
        loading={loading}
        error={error}
    >
      <div className='mensajeVacio'>
          <h1>NO HAY EMPRESAS PARA CALIFICAR SPRINTS</h1>
      </div>
    </BaseUI>
  )    
  return (
    <ListaDefinitivaN
      loading={loading}
      error={error}
      titulo="SELECCIONE UNA EMPRESA PARA CALIFICAR"
      cabezeraTitulo={null}
      cabezeras={columns}
      datosTabla={listaEmpresas}
      ocultarAtras={false}
      confirmarAtras={false}
      dirBack={`/`}
      dirForward= {`/homeGrupo/${idGrupo}/listaEmpresaCalificarSprints/`}
      mensajeSearch = "Buscar empresa"
      nombreContador = "Empresas"
    />
  );
}

export default ListaEmpresaSprints;