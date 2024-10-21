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
            message: `${newRows[index].hito}: La fecha de inicio no puede ser posterior a la fecha fin del mismo sprint. Verifique el `,

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
    for (const row of rows) {
      if (Object.values(row).some((value) => value === "" || value === null)) {
        console.error("Hay campos vacíos en uno de los sprints.");
        setSnackbar({
          open: true,
          message: "Ninguno de los campos debe estar vacío",
          severity: "warning",
          autoHide: "false",
        });
        return;
      }
    }

    const date = new Date();
    const dia = String(date.getDate()).padStart(2, "0");
    const mes = String(date.getMonth() + 1).padStart(2, "0");
    const anio = date.getFullYear();
    const horas = String(date.getHours()).padStart(2, "0");
    const minutos = String(date.getMinutes()).padStart(2, "0");
    const segundos = String(date.getSeconds()).padStart(2, "0");

    const data = {
      idEmpresa: Number(idEmpresa),
      comentarioDocente: String(
        planificacionData.comentarioDocente
          ? planificacionData.comentarioDocente
          : "Falta que comente el docente"
      ),
      notaPlanificacion: Number(planificacionData.notaPlanificacion),
      aceptada: Boolean(planificacionData.aceptada),
      fechaEntrega: `${anio}-${mes}-${dia} ${horas}:${minutos}:${segundos}`,
      sprints: rows.map((row) => ({
        fechaIni: row.fechaIni,
        fechaFin: row.fechaFin,
        cobro: Number(row.cobro),
        fechaEntrega: row.fechaEntrega,
        entregables: row.entregables,
      })),
    };

    console.log(data);

    const response = await fetch(
      "http://localhost:8000/api/planificacion/guardar",
      {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const responseData = await response.json();

    {
      /** ResponseData no devuelve success nunca 
        if (responseData.success) {
        setOpenAlertS(true);
      } else {
        setOpenAlertS(true);
        */
    }
    if (responseData.error) {
      setSnackbar({
        open: true,
        message: "Error: ${responseData.error}, pruebe mas tarde.",
        severity: "error",
      });
    } else {
      console.log("Los datos se subieron correctamente.");
      setSnackbar({
        open: true,
        message: "Se subio los datos correctamente.",
        severity: "success",
        autoHide: "true",
      });
      console.log("Respuesta del servidor:", responseData);
    }
  };

  return (
    <>
      <Box >
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
                    <Button
                      variant= "contained"
                      color="secondary"
                      startIcon={<DeleteIcon />}
                      onClick={() => dialogoEliminar(index, row.hito)}
                    >
                      Eliminar
                    </Button>
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
            sx={{marginTop: "20px"}}
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