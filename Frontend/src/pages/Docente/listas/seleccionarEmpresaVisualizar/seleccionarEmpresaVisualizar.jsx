import { useEffect, useState } from "react";
import {getPlanificacionesAceptadas} from '../../../../api/getPlanificacionesAceptadas'
import Loading from "../../../../components/loading/loading";
import Error from "../../../../components/error/error";
import ListaDefinitivaN from "../../../../components/listaDefinitiva/listaDefinitivaN";
import { Typography } from "@mui/material";
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

function ListaEmpresasVisualizar() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({
    errorMessage: "",
    errorDetails: "",
  });
  const [listaEmpresas, setListaEmpresas] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [lista] = await Promise.all([getPlanificacionesAceptadas()]);
        setListaEmpresas(lista);
        console.log(lista);
      } catch (error) {
        console.error("Error en la solicitud:", error.message);
        setError({
          errorMessage: "Ha ocurrido un error",
          errorDetails: error.message,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {error.errorMessage || error.errorDetails ? (
        <Error
          errorMessage={error.errorMessage}
          errorDetails={error.errorDetails}
        />
      ) : loading ? (
        <Loading />
      ) : listaEmpresas.length > 0 ? (
        <>
            <ListaDefinitivaN
              titulo="SELECCIONE UNA PLANIFICACION PARA VISUALIZAR"
              cabezeraTitulo={null}
              cabezeras={columns}
              datosTabla={listaEmpresas}
              ocultarAtras={false}
              confirmarAtras={false}
              dirBack="/"
              dirForward="/visualizarPlanificacion/empresa/"
              mensajeSearch = "Buscar Empresa"
              nombreContador = "Empresas"
            />
        </>
      ) : (
        <>
          <Typography>
            Actualmente no hay planificaciones que hayan sido validadas, intente
            más tarde.
          </Typography>
        </>
      )}
    </>
  );
}

export default ListaEmpresasVisualizar;

