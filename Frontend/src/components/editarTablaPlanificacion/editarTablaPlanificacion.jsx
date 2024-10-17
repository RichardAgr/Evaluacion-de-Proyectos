/* eslint-disable react/prop-types */
import { Fragment, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Box,
  Alert,
  AlertTitle,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoSnackbar from "../infoSnackbar/infoSnackbar";
import CuadroDialogo from "../cuadroDialogo/cuadroDialogo";
import DecisionButtons from "../Buttons/decisionButtons";

export default function EditarPlanificacion({ planificacionData, idEmpresa }) {
  const [rows, setRows] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const [cuadroDialogo, setCuadroDialogo] = useState({
    open: false,
    onConfirm: () => {},
    title: "",
    description: "",
  });
  const handleCancel = () => {
    setCuadroDialogo({
      open: true,
      title: "Descartar los cambios",
      description:
        "Esta acción no se puede deshacer. Todos los cambios realizados se perderán.  ¿Está seguro?",
      onConfirm: () => window.location.reload(),
    });
  };
  const handleSave = () => {
    setCuadroDialogo({
      open: true,
      title: "Guardar los cambios",
      description:
        "Esta acción guardará todos los cambios realizados en la planificación. ¿Está seguro?",
      onConfirm: subir,
    });
  };

  useEffect(() => {
    const newRows = planificacionData.sprints.map((sprint, index) => {
      return {
        hito: `SPRINT ` + (index + 1),
        fechaIni: sprint.fechaIni,
        fechaFin: sprint.fechaFin,
        cobro: sprint.cobro,
        fechaEntrega: sprint.fechaEntrega,
        entregables: sprint.entregables,
      };
    });
    setRows(newRows);
  }, [planificacionData]);
  const addRow = () => {
    const newSprint = rows.length + 1;
    const newRow = {
      hito: `SPRINT ${newSprint}`,
      fechaIni: "",
      fechaFin: "",
      cobro: "",
      fechaEntrega: "",
      entregables: "",
    };
    setRows([...rows, newRow]);
  };

  const deleteRow = (index) => {
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
  };
  const dialogoEliminar = (index, hito) => {
    setCuadroDialogo({
      open: true,
      title: `Eliminar ${hito}`,
      description:
        "Esta acción no se puede deshacer. Todos los cambios realizados se perderán.  ¿Está seguro?",
      onConfirm: () => {
        deleteRow(index);
        setCuadroDialogo({ ...cuadroDialogo, open: false });
      },
    });
  };
  const handleCellChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;

    // Validate dates
    if (field.includes("fecha")) {
      const currentDate = new Date().toISOString().split("T")[0];
      const prevSprintEndDate = index > 0 ? rows[index - 1].fechaFin : null;

      if (value < currentDate) {
        setSnackbar({
          open: true,
          message: `${newRows[index].hito}: No se permite seleccionar fechas anteriores al día actual.`,
          severity: "error",
          autoHide: 1000,
        });
      } else if (field === "fechaIni") {
        if (prevSprintEndDate && value < prevSprintEndDate) {
          setSnackbar({
            open: true,
            message: `${newRows[index].hito}: La fecha de inicio no puede ser anterior a la fecha fin del sprint anterior.`,
            severity: "error",
            autoHide: 1000,
          });
        } else if (
          newRows[index].fechaFin != "" &&
          value > newRows[index].fechaFin
        ) {
          setSnackbar({
            open: true,
            message: `${newRows[index].hito}: La fecha de inicio no puede ser posterior a la fecha fin del mismo sprint.`,

            severity: "error",
            autoHide: 1000,
          });
          console.log(newRows[index]);
        }
      } else if (field === "fechaFin" && value < newRows[index].fechaIni) {
        setSnackbar({
          open: true,
          message: `${newRows[index].hito}: La fecha fin no puede ser anterior a la fecha de inicio del mismo sprint.`,
          severity: "error",
          autoHide: 1000,
        });
      } else if (field === "fechaEntrega" && value < newRows[index].fechaFin) {
        setSnackbar({
          open: true,
          message: `${newRows[index].hito}: La fecha de entrega no puede ser anterior a la fecha fin del mismo sprint.`,
          severity: "error",
          autoHide: 1000,
        });
        return;
      }
    }
    setRows(newRows);
  };
  const subir = async () => {
    setCuadroDialogo({
      ...cuadroDialogo,
      open: false,
    });
    let rowIndex = 0;
    for (const row of rows) {
      rowIndex++;
      if (Object.values(row).some((value) => value === "" || value === null)) {
        console.error("Hay campos vacíos en uno de los sprints.");
        setSnackbar({
          open: true,
          message: `Sprint ${rowIndex}: Ninguno de los campos debe estar vacío`,
          severity: "warning",
          autoHide: "false",
        });
        return;
      }
    }

    const dataPlanificacion = {
      idEmpresa: Number(idEmpresa),
      comentarioDocente: String(
        planificacionData.comentarioDocente
          ? planificacionData.comentarioDocente
          : null
      ),
      notaPlanificacion: 0,
      aceptada: 0,
    };
    const dataSprint = {
      idEmpresa: Number(idEmpresa),
      sprints: rows.map((row) => ({
        fechaIni: row.fechaIni,
        fechaFin: row.fechaFin,
        cobro: Number(row.cobro),
        fechaEntrega: row.fechaEntrega,
        entregables: row.entregables,
      })),
    };
    const response = await fetch(
      "http://localhost:8000/api/planificacion/guardar",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataPlanificacion),
      }
    );
    const responseData = await response.json();
    if (responseData.error !== undefined && responseData.error !== null) {
      setSnackbar({
        open: true,
        message: `Error al actualizar la planificacion: ${responseData.error}${responseData.message}`,
        severity: "error",
        autoHide: false,
      });
    } else {
      console.log("Planificacion modificada con exito.");
      const responseSprint = await fetch(
        "http://localhost:8000/api/planificacion/guardarSprints",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataSprint),
        }
      );
      const responseDataSprint = await responseSprint.json();
      if (
        responseDataSprint.error !== undefined &&
        responseDataSprint.error !== null
      ) {
        setSnackbar({
          open: true,
          message: `Error al modificar los Sprints: ${responseDataSprint.error} ${responseDataSprint.message}`,
          severity: "error",
          autoHide: false,
        });
      } else if (
        responseDataSprint.errors !== undefined &&
        responseDataSprint.errors !== null
      ) {
        setSnackbar({
          open: true,
          message: `Los datos en la planicacion no son validos, proximamente se podra decir exactamente que esta mal`,
          severity: "error",
          autoHide: false,
        });

        console.log("Respuesta del servidor:");
        console.log(responseDataSprint);
      } else {
        {
          /** Aun no se manejan los errores tipo {responseDataSprint.errors} */
        }
        console.log("Sprints modificados con exito.");
        setSnackbar({
          open: true,
          message: `${responseDataSprint.message}`,
          severity: "success",
          autoHide: true,
        });
        console.log("Respuesta del servidor:");
        console.log(responseDataSprint);
      }
    }
  };

  return (
    <>
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="tabla de planificación">
            <TableHead>
              <TableRow>
                <TableCell>Hito</TableCell>
                <TableCell align="left">Fecha Inicio</TableCell>
                <TableCell align="left">Fecha Fin</TableCell>
                <TableCell align="left">Cobro</TableCell>
                <TableCell align="left">Fecha Entrega</TableCell>
                <TableCell align="left">Entregables</TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {Object.keys(row).map((field) => (
                    <TableCell key={field} align="left">
                      <TextField
                        value={row[field] ?? ""}
                        onChange={(e) =>
                          handleCellChange(index, field, e.target.value)
                        }
                        type={field.includes("fecha") ? "date" : "text"}
                        fullWidth
                        variant="standard"
                        inputProps={{
                          "aria-label": `${field} for ${row.hito}`,
                        }}
                      />
                    </TableCell>
                  ))}
                  <TableCell align="left">
                    {rows.length > 1 && (
                      <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<DeleteIcon />}
                        onClick={() => dialogoEliminar(index, row.hito)}
                      >
                        Eliminar
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={addRow}
          sx={{ marginTop: "20px" }}
        >
          Añadir fila
        </Button>

        <DecisionButtons
          rejectButtonText="Descartar"
          validateButtonText="Guardar cambios"
          onReject={handleCancel}
          onValidate={handleSave}
        />
      </Box>
      <CuadroDialogo
        open={cuadroDialogo.open}
        onClose={() => setCuadroDialogo({ ...cuadroDialogo, open: false })}
        title={cuadroDialogo.title}
        description={cuadroDialogo.description}
        onConfirm={cuadroDialogo.onConfirm}
      />
      <InfoSnackbar
        openSnackbar={snackbar.open}
        setOpenSnackbar={(open) => setSnackbar({ ...snackbar, open })}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </>
  );
}
