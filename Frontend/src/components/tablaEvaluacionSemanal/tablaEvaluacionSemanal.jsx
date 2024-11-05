import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from "@mui/material";
import DecisionButtons from "../Buttons/decisionButtons";
import CuadroDialogo from "../cuadroDialogo/cuadroDialogo";
import InfoSnackbar from "../infoSnackbar/infoSnackbar";
import { useParams } from "react-router-dom";
import { updateSprintEvaluar } from "../../api/getSprintsEmpresa";

const TablaEvaluacionSemanal = ({ estudiantes, idSprint }) => {
  const { idEmpresa } = useParams();
  //const [notas, setNotas] = useState(estudiantes.map(est => est.nota || ""));
  const [comentarios, setComentarios] = useState(estudiantes.map(est => est.comentario || ""));
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
    autoHide: 6000,
  });
  const [cuadroDialogo, setCuadroDialogo] = useState({
    open: false,
    onConfirm: () => {},
    title: "",
    description: "",
  });

  const handleComentarioChange = (index, value) => {
    const newComentarios = [...comentarios];
    newComentarios[index] = value;
    setComentarios(newComentarios);
  };

  const handleSave = () => {
    setCuadroDialogo({
      open: true,
      title: "Guardar los cambios",
      description: "Esta acción guardará todos los cambios realizados en la tarea. ¿Está seguro?",
      onConfirm: handleSubmit,
    });
  };

  const handleCancel = () => {
    setCuadroDialogo({
      open: true,
      title: "Descartar los cambios",
      description: "Esta acción no se puede deshacer. Todos los cambios realizados se perderán. ¿Está seguro?",
      onConfirm: () => window.location.reload(),
    });
  };

  const handleSubmit = async () => {
    try {
      setCuadroDialogo({ ...cuadroDialogo, open: false });
      const response = await updateSprintEvaluar(idEmpresa, idSprint, estudiantes.map((est, idx) => ({
        idEmpresa: idEmpresa,
        idEstudiante: est.idEstudiante,
        idSprint: idSprint,
        comentario: comentarios[idx],
      })));

      setSnackbar({
        open: true,
        message: response.message,
        severity: "success",
      });
    } catch (error) {
      console.log(error)
      setSnackbar({
        open: true,
        message: "Error al guardar la evaluación",
        severity: "error",
      });
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="team evaluation table">
          <TableHead>
            <TableRow>
              <TableCell>Integrante</TableCell>
              <TableCell>Tareas</TableCell>
              {/* <TableCell>Nota (1-100)</TableCell> */}
              <TableCell>Comentario</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {estudiantes?.map((estudiante, index) => (
              <TableRow key={index}>
                <TableCell>{estudiante.nombreCompleto}</TableCell>
                <TableCell>
                  <ul>
                    {estudiante?.tareas.map((tarea, idx) => (
                      <li key={idx}>{tarea}</li>
                    ))}
                  </ul>
                </TableCell>
                {/* <TableCell>
                  <TextField
                    type="number"
                    value={notas[index]}
                    onChange={(e) => handleNotaChange(index, e.target.value)}
                    inputProps={{ min: 1, max: 100 }}
                    size="small"
                  />
                </TableCell> */}
                <TableCell>
                  <TextField
                    multiline
                    rows={3}
                    defaultValue={estudiante.comentario[index]}
                    value={comentarios[index]}
                    onChange={(e) => handleComentarioChange(index, e.target.value)}
                    fullWidth
                    placeholder="Ingrese un comentario"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <DecisionButtons
        rejectButtonText="Descartar"
        validateButtonText="Guardar Evaluación"
        onReject={handleCancel}
        onValidate={handleSave}
        disabledButton={0}
      />

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
        autoHide={snackbar.autoHide}
      />
    </>
  );
};

export default TablaEvaluacionSemanal;
