import { useState, useEffect } from 'react';
import ListaDefinitivaN from '../../../../components/listaDefinitiva/listaDefinitivaN';
import { useParams } from 'react-router-dom';
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

function ListaCali() {
    const { idGrupo, idEstudiante} = useParams()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({
        errorMessage: "",
        errorDetails: "",
    });
    const [listaEmpresas, setListaEmpresas] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:8000/api/grupo/${idGrupo}/empresas`);
                if (!response.ok) {
                    throw new Error('Error al obtener los datos.');
                }
                const data = await response.json();
                setListaEmpresas(data)
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
      }, []);

  return (
    <ListaDefinitivaN
      titulo="SELECCIONE UNA EMPRESA PARA VISUALIZAR CALIFICACION"
      cabezeraTitulo={null}
      cabezeras={columns}
      datosTabla={listaEmpresas}
      ocultarAtras={false}
      confirmarAtras={false}
      dirBack={`/`}
      dirForward= {`/homeGrupo/${idGrupo}/empresa/calificaciones/`}
      mensajeSearch = "Buscar empresa"
      nombreContador = "Empresas"
      loading={loading}
      error={error}
    />
  );
}

export default ListaCali;