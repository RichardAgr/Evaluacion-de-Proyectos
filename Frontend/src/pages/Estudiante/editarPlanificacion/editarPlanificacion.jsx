import { Fragment, useState, useEffect } from "react";
import ComentarioNota from "../../../components/comentarioNota/comentarioNota.jsx";
import { useParams } from "react-router-dom";
import EditarPlanificacion from "../../../components/editarTablaPlanificacion/editarTablaPlanificacion.jsx";
import { getPlanificacion } from "../../../api/getPlanificacion.jsx";
import { getNombreEmpresa } from "../../../api/getNombreEmpresa.jsx";
import NombreEmpresa from "../../../components/infoEmpresa/nombreEmpresa.jsx";
import BaseUI from "../../../components/baseUI/baseUI.jsx";
import Loading from "../../../components/loading/loading.jsx";

function Planificacion() {
  let { idEmpresa } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [planificacionData, setPlanificacionData] = useState();
  const [datosEmpresa, setDatosEmpresa] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [planificacion, nombreEmpresa] = await Promise.all([
          getPlanificacion(idEmpresa),
          getNombreEmpresa(idEmpresa),
        ]);
        setPlanificacionData(planificacion);
        setDatosEmpresa(nombreEmpresa);
      } catch (error) {
        console.error("Error en la solicitud:", error.message);
        setError(`Error en la solicitud: ${error.message}`);
      } finally {
        setLoading(false);
        console.log(planificacionData.comentarioDocente);
      }
    };
    fetchData();
  }, [idEmpresa]);
  return (
    <Fragment>
      <BaseUI
        titulo={"MODIFICAR PLANIFICACION"}
        ocultarAtras={false}
        confirmarAtras={true}
        dirBack={"/"}
      >
        {error ? (
          <p>Error: {error}</p>
        ) : loading ? (
          <Loading />
        ) : (
          <>
            <NombreEmpresa
              nombreLargo={datosEmpresa.nombreLargo}
              nombreCorto={datosEmpresa.nombreEmpresa}
            />

            <EditarPlanificacion
              planificacionData={planificacionData}
              idEmpresa={planificacionData.idEmpresa}
            />
            {planificacionData.comentarioDocente != null && (
              <>
                <ComentarioNota
                  comentario={
                    planificacionData.comentarioDocente
                  }
                  nota={planificacionData.notaPlanificacion || "Sin Calificar"}
                  linkDir={"ocultar"}
                />
              </>
            )}
          </>
        )}
      </BaseUI>
    </Fragment>
  );
}

export default Planificacion;
