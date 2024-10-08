import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
import BaseUI from "../../../components/baseUI/baseUI.jsx";
import TablaPlanificacion from "../../../components/vistaTablaPlanificacion/vistaTablaPlanificacion.jsx";
import { getEmpresaData } from "../../../api/getEmpresa.jsx";
import { getPlanificacion } from "../../../api/getPlanificacion.jsx";
import { validar } from "../../../api/validarPlanificacion/validar.jsx";
import { addRevision } from "../../../api/validarPlanificacion/addRevision.jsx";
import InfoSnackbar from "../../../components/infoSnackbar/infoSnackbar.jsx";
import CuadroComentario from "../../../components/cuadroComentario/cuadroComentario.jsx";
import CuadroNota from "../../../components/cuadroNota/cuadroNota.jsx";

function ValidarPlanificacion() {
  const [openValidateDialog, setOpenValidateDialog] = useState(false);
  const [openRejectDialog, setOpenRejectDialog] = useState(false);
  const [groupComment, setGroupComment] = useState("");
  const [privateComment, setPrivateComment] = useState("");
  const [nota, setNota] = useState('');

  let { idEmpresa } = useParams();
  const [empresaData, setEmpresaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [planificacionData, setPlanificacionData] = useState({
    aceptada: false,
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const triggerSnackbar = (message, severity) => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const errorTranslations = {
    "The comentario field must be a string.":
      "El comentario para el grupo no debe estar vacio.",
    "The nota field must be at least 0.": "La nota debe ser al menos 0.",
    "The nota field must not be greater than 100.":
      "La nota no debe ser mayor que 100.",
    "The nota field must be a number.": "El campo nota está vacío.",
    "The group comment field is required.":
      "El campo de comentario para el grupo es obligatorio.",
    // aca se añaden los demas errores de ser necesario
  };

  const translateError = (error) => {
    return errorTranslations[error] || `Error: ${error}`;
  };

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
        setError(`Error en la solicitud: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [idEmpresa]);

  const handleValidate = () => {
    setOpenValidateDialog(true);
  };

  const handleReject = () => {
    setOpenRejectDialog(true);
  };

  const confirmValidate = async () => {
    setOpenValidateDialog(false);
    console.log(idEmpresa);
    const revisionResult = await addRevision(idEmpresa, nota, groupComment);

    if (revisionResult.errors != null) {
      const errorMessages = Object.keys(revisionResult.errors)
        .map((key) => {
          const errors = revisionResult.errors[key];
          return errors
            .map((error) => `${key}: ${translateError(error)}`)
            .join("\n");
        })
        .join("\n");
      console.log(errorMessages);
      setSnackbar({
        open: true,
        message: errorMessages,
        severity: "error",
      });
    } else {
      const validarResult = await validar(idEmpresa);
      if (validarResult.error == null) {
        setSnackbar({
          open: true,
          message: validarResult.message,
          severity: "success",
        });
        setTimeout(() => {
          setPlanificacionData((prevState) => ({
            ...prevState,
            aceptada: true,
          }));
        }, 3000);
      } else {
        setSnackbar({
          open: true,
          message: validarResult.error,
          severity: "error",
        });
      }
    }
  };

  const confirmReject = async () => {
    setOpenRejectDialog(false);
    console.log(idEmpresa);
    const revisionResult = await addRevision(idEmpresa, nota, groupComment, 2);
    console.log(revisionResult);

    console.log(revisionResult.errors);
    if (revisionResult.errors != null) {
      const errorMessages = Object.keys(revisionResult.errors)
        .map((key) => {
          const errors = revisionResult.errors[key];
          return errors
            .map((error) => `${key}: ${translateError(error)}`)
            .join("\n");
        })
        .join("\n");
      console.log(errorMessages);
      setSnackbar({
        open: true,
        message: errorMessages,
        severity: "error",
      });
    } else {
      setSnackbar({
        open: true,
        message: revisionResult.message,
        severity: "success",
      });
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          minHeight: "200px",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) return <p>Error: {error}</p>;

  if (planificacionData.aceptada) {
    return (
      <Fragment>
        <BaseUI
          titulo={"VALIDAR PLANIFICACION"}
          ocultarAtras={false}
          confirmarAtras={false}
          dirBack={"/"}
        >
          <Box
            sx={{
              display: "flex",
              height: "100%",
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
        </BaseUI>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <BaseUI
        titulo={"VALIDAR PLANIFICACION"}
        ocultarAtras={false}
        confirmarAtras={true}
        dirBack={"/"}
      >
        <TablaPlanificacion sprints={planificacionData.sprints} />
        <CuadroComentario
        title="Comentario para el grupo" 
        maxChars={200} 
        onTextChange={(text) => setGroupComment(text)} 
        />

        <CuadroComentario
        title="Comentario privado" 
        maxChars={400} 
        onTextChange={(text) => setPrivateComment(text)} 
        />
        <CuadroNota
        onNoteChange={(value) => setNota(value)} 
      />
        <Box
          sx={{
            marginTop: "40px",
            display: "flex",
            justifyContent: "flex-end",
            gap: "20px",

            padding: "20px",
          }}
        >
          <Button variant="contained" color="secondary" onClick={handleReject}>
            Rechazar Planificación
          </Button>
          <Button variant="contained" color="primary" onClick={handleValidate}>
            Validar Planificación
          </Button>
        </Box>

        <Dialog
          open={openValidateDialog}
          onClose={() => setOpenValidateDialog(false)}
        >
          <DialogTitle>Confirmar Validación</DialogTitle>
          <DialogContent>
            <DialogContentText>
              ¿Está seguro de que desea validar esta planificación?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setOpenValidateDialog(false)}
              color="secondary"
              variant="contained"
            >
              Cancelar
            </Button>
            <Button
              onClick={confirmValidate}
              variant="contained"
              color="primary"
              autoFocus
            >
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={openRejectDialog}
          onClose={() => setOpenRejectDialog(false)}
        >
          <DialogTitle>Confirmar Rechazo</DialogTitle>
          <DialogContent>
            <DialogContentText>
              ¿Está seguro de que desea rechazar esta planificación?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenRejectDialog(false)} variant="contained" color="secondary">
              Cancelar
            </Button>
            <Button onClick={confirmReject} variant="contained" color="primary" autoFocus>
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>

        <InfoSnackbar
          openSnackbar={snackbar.open}
          setOpenSnackbar={(open) => setSnackbar({ ...snackbar, open })}
          message={snackbar.message}
          severity={snackbar.severity}
        />
      </BaseUI>
    </Fragment>
  );
}

export default ValidarPlanificacion;
