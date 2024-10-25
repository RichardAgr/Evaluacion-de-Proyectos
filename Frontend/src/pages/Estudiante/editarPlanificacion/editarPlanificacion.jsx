import { Fragment, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Comentario from "../../../components/comentario/comentario.jsx";
import EditarPlanificacion from "../../../components/editarTablaPlanificacion/editarTablaPlanificacion.jsx";
import { getPlanificacion } from "../../../api/getPlanificacion.jsx";
import { getNombreEmpresa } from "../../../api/getNombreEmpresa.jsx";
import NombreEmpresa from "../../../components/infoEmpresa/nombreEmpresa.jsx";
import BaseUI from "../../../components/baseUI/baseUI.jsx";
import Loading from "../../../components/loading/loading.jsx";
import Error from "../../../components/error/error.jsx";
import EstadoPlanificacion from "../../../components/estadoPlanificacion/estadoPlanificacion.jsx";
import Redirecting from "../../../components/redirecting/redirecting.jsx";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";

function ModificarPlanificacion() {
  let { idEmpresa } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({
    errorMessage: "",
    errorDetails: "",
  });
  const [planificacionData, setPlanificacionData] = useState();
  const [datosEmpresa, setDatosEmpresa] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [planificacion, nombreEmpresa] = await Promise.all([
          getPlanificacion(idEmpresa),
          getNombreEmpresa(idEmpresa),
        ]);
        setPlanificacionData(planificacion);
        console.log(planificacion);
        setDatosEmpresa(nombreEmpresa);
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

  useEffect(() => {
    if (planificacionData && planificacionData.aceptada) {
      const timer = setTimeout(() => {
        navigate(`/visualizarPlanificacion/empresa/${idEmpresa}`);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [planificacionData, idEmpresa, navigate]);

  return (
    <Fragment>
      <BaseUI
        titulo={"MODIFICAR PLANIFICACION"}
        ocultarAtras={false}
        confirmarAtras={true}
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
            <NombreEmpresa
              nombreLargo={datosEmpresa.nombreLargo}
              nombreCorto={datosEmpresa.nombreEmpresa}
            />
            <EstadoPlanificacion
              estado={planificacionData.aceptada}
            />
            {planificacionData.aceptada ? (
              <Redirecting />
            ) : (
              <>
                <EditarPlanificacion
                  planificacionData={planificacionData}
                  idEmpresa={planificacionData.idEmpresa}
                />
                {planificacionData.comentariopublico != null &&
                  planificacionData.comentariopublico != "" && (
                    <>
                      <Comentario
                        comentariopublico={planificacionData.comentariopublico}
                      />
                    </>
                  )}
              </>
            )}
          </>
        )}
      </BaseUI>
    </Fragment>
  );
}

export default ModificarPlanificacion;
