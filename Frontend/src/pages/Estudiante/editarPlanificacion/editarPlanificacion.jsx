import { Fragment, useState, useEffect } from "react";
import ComentarioNota from "../../../components/comentarioNota/comentarioNota.jsx";
import { useParams } from "react-router-dom";
import EditarPlanificacion from "../../../components/editarTablaPlanificacion/editarTablaPlanificacion.jsx";
import { getPlanificacion } from "../../../api/getPlanificacion.jsx";
import { getNombreEmpresa } from "../../../api/getNombreEmpresa.jsx";
import NombreEmpresa from "../../../components/infoEmpresa/nombreEmpresa.jsx";
import BaseUI from "../../../components/baseUI/baseUI.jsx";
import Loading from "../../../components/loading/loading.jsx";
import Error from "../../../components/error/error.jsx";
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

function Planificacion() {
  let { idEmpresa } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({
    errorMessage: "",
    errorDetails: "",
  });
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
            {planificacionData.aceptada ? (
              <>
                <Box
                  sx={{
                    display: "flex",
                    height: "70%",
                    width: "100%",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h5">
                    Esta planificación ya ha sido validada.
                  </Typography>
                </Box>
              </>
            ) : (
              <>
                <EditarPlanificacion
                  planificacionData={planificacionData}
                  idEmpresa={planificacionData.idEmpresa}
                />
                {planificacionData.comentarioDocente != null &&
                  planificacionData.comentarioDocente != "" && (
                    <>
                      <ComentarioNota
                        comentario={planificacionData.comentarioDocente}
                        nota={
                          planificacionData.notaPlanificacion || "Sin Calificar"
                        }
                        linkDir={"ocultar"}
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

export default Planificacion;
