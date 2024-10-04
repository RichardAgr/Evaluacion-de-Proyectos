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

function ValidarPlanificacion() {
  const [openValidateDialog, setOpenValidateDialog] = useState(false);
  const [openRejectDialog, setOpenRejectDialog] = useState(false);
  const [groupComment, setGroupComment] = useState("");
  const [privateComment, setPrivateComment] = useState("");
  const [nota, setNota] = useState(0);

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
    const revisionResult = await addRevision(idEmpresa, nota, groupComment, 2);

    if (revisionResult.errors != null) {
      const errorMessages = Object.keys(revisionResult.errors)
        .map((key) => {
          return `${key}: ${revisionResult.errors[key][0]}`;
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
          return `${key}: ${revisionResult.errors[key][0]}`;
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
        <TextField
          label="Comentarios para el grupo"
          multiline
          rows={4}
          value={groupComment}
          onChange={(e) => setGroupComment(e.target.value)}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Comentarios privados"
          multiline
          rows={4}
          value={privateComment}
          onChange={(e) => setPrivateComment(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
          <Typography variant="body1" sx={{ mr: 2 }}>
            Nota:
          </Typography>
          <TextField
            type="number"
            value={nota}
            onChange={(e) => {
              const value = e.target.value;
              setNota(value === "" ? "" : Number(value));
            }}
            inputProps={{
              min: 0,
              max: 100,
              style: { width: "50px", height: "50px", textAlign: "center" },
            }}
            variant="outlined"
            size="small"
          />
        </Box>
        <Box
          sx={{
            marginTop: "40px",
            display: "flex",
            justifyContent: "flex-end",
            gap: "20px",
          }}
        >
          <Button variant="contained" color="primary" onClick={handleValidate}>
            Validar Planificación
          </Button>
          <Button variant="contained" color="secondary" onClick={handleReject}>
            Rechazar Planificación
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
              color="primary"
            >
              Cancelar
            </Button>
            <Button onClick={confirmValidate} color="primary" autoFocus>
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
            <Button onClick={() => setOpenRejectDialog(false)} color="primary">
              Cancelar
            </Button>
            <Button onClick={confirmReject} color="secondary" autoFocus>
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
