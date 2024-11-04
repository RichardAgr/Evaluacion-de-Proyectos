import { Fragment, useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import InfoEmpresa from "../../../components/infoEmpresa/infoEmpresa.jsx";
import NombreEmpresa from "../../../components/infoEmpresa/nombreEmpresa.jsx";
import TablaNotasPlanificacion from "../../../components/tablaPlanificacionNotas/tablaPlanificacionNotas.jsx";
import TablaPlanificacion from "../../../components/tablaPlanificacionDeDesarollo/tablaPlanificacion.jsx";
import { getEmpresaData } from "../../../api/getEmpresa.jsx";
import { getPlanificacion } from "../../../api/getPlanificacion.jsx";
import BaseUI from "../../../components/baseUI/baseUI.jsx";
import Error from "../../../components/error/error.jsx";
import Loading from "../../../components/loading/loading.jsx";
import Comentario from "../../../components/comentario/comentario.jsx";

const loginDocente = true;

function PlanificacionDeDesarollo() {
  const [empresaData, setEmpresaData] = useState(null);
  let { idEmpresa } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({
    errorMessage: "",
    errorDetails: "",
  });
  const [planificacionData, setPlanificacionData] = useState({
    aceptada: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [empresa, planificacion] = await Promise.all([
          getEmpresaData(idEmpresa),
          getPlanificacion(idEmpresa),
        ]);
        setEmpresaData(empresa);
        setPlanificacionData(planificacion);
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
  }, [idEmpresa]);
  return (
    <Fragment>
      <BaseUI
        titulo={"VISUALIZAR PLANIFICACION DE DESARROLLO"}
        ocultarAtras={false}
        confirmarAtras={false}
        dirBack={"/"}
      >
        {error.errorMessage || error.errorDetails ? (
          <Error
            errorMessage={error.errorMessage}
            errorDetails={error.errorDetails}
          />
        ) : loading ? (
          <Loading />
        ) : (
          <>
            {!planificacionData.aceptada ? (
              <>
                <NombreEmpresa
                  nombreLargo={empresaData.nombreLargo}
                  nombreCorto={empresaData.nombreEmpresa}
                />
                <div className="divContainerPlani">
                  <h1>TODAVIA NO FUE VALIDADA</h1>
                </div>
              </>
            ) : (
              <>
                <InfoEmpresa
                  nombreLargo={empresaData.nombreLargo}
                  nombreCorto={empresaData.nombreEmpresa}
                  integrantes={empresaData.integrantes}
                />
                <TablaPlanificacion
                  sprints={planificacionData.sprints}
                  ocultarBotones={true}
                />
                {planificacionData.comentariopublico && (
                  <Comentario
                    titulo="Comentario:"
                    comentario={planificacionData.comentariopublico}
                  />
                )}
                {(planificacionData.comentarioprivado && loginDocente) && (
                  <Comentario
                    titulo="Comentario Privado:"
                    comentario={planificacionData.comentarioprivado}
                  />
                )}
              </>
            )}
          </>
        )}
      </BaseUI>
    </Fragment>
  );
}

export default PlanificacionDeDesarollo;
