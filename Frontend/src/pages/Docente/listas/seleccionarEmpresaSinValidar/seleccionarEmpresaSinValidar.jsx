import Loading from "../../../../components/loading/loading";
import Error from "../../../../components/error/error";
import { useState,useEffect } from "react";
import {getPlanificacionesSinValidar} from '../../../../api/getPlanificacionesSinValidar'
import ListaDefinitivaN from "../../../../components/listaDefinitiva/listaDefinitivaN";
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
function SeleccionarEmpresaSinValidar() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({
    errorMessage: "",
    errorDetails: "",
  });
  const [listaEmpresas, setListaEmpresas] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      const responseData = await Promise.all([getPlanificacionesSinValidar()]);
      if (responseData.error !== undefined && responseData.error !== null) {
        setError({
          errorMessage: "Ha ocurrido un error",
          errorDetails: error.message,
        });
      } else {
        const [lista] = await responseData;
        setListaEmpresas(lista);
        console.log(lista);
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  if (loading) return <Loading />;
  if (error.error) return <Error errorMessage={error.errorMessage} errorDetails={error.errorDetails} />;
  return (
    <ListaDefinitivaN
      titulo='SELECCIONE UNA PLANIFICACION PARA VALIDAR'
      cabezeraTitulo={null}
      cabezeras={columns}
      datosTabla={listaEmpresas}
      ocultarAtras={false}
      confirmarAtras={false}
      dirBack="/"
      dirForward="/validarPlanificacion/Empresa/"
      mensajeSearch = "Buscar Empresa"
      nombreContador = "Empresas"
    />
  );
}

export default SeleccionarEmpresaSinValidar;
