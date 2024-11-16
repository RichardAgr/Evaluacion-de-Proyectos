/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
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

const TablaEvaluacionSemanal = ({ sprint, comenta, showButtons = true }) => {
  const { idEmpresa} = useParams();
  const [comentarios, setComentarios] = useState([]);
  useEffect(() => {
    console.log(comenta)
    const iniciarComentarios = (
      
      sprint?.semana?.tareasEstudiante && Array.isArray(sprint.semana.tareasEstudiante)
        ? sprint.semana.tareasEstudiante.map((estudiante) => ({
            semana_idSemana: sprint.semana.idSemana,
            estudiante_idEstudiante: estudiante.idEstudiante,
            comentario: ''
          }))
        : []
    );
  
    const newComentarios = iniciarComentarios.map((comentario) => {
      const indice = comenta.findIndex(estudiante => estudiante.estudiante_idEstudiante === comentario.estudiante_idEstudiante);
      
      // Si no se encuentra el estudiante en "comenta", se conserva el valor de "comentario" vacío
      return indice === -1 ? comentario : {...comentario, comentario: comenta[indice].comentario};
    });
  
    console.log(newComentarios);
    setComentarios(newComentarios);
  }, [comenta]); // Asegúrate de que sprint también esté en las dependencias
  


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
    //
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="team evaluation table">
          <TableHead>
            <TableRow>
              <TableCell>Integrante</TableCell>
              <TableCell>Tareas</TableCell>
              <TableCell>Comentario</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sprint.semana?.tareasEstudiante?.map((estudiante, index) => (
              <TableRow key={index}>
                <TableCell>{estudiante.nombre}</TableCell>
                <TableCell>
                  <ul>
                    {estudiante?.tareas.map((tarea, idx) => (
                      <li key={idx}>{tarea.nombreTarea}</li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell>
                  <TextField
                    multiline
                    rows={3}
                    defaultValue={comentarios[index]?.comentario || ''}
                    value={comentarios[index]?.comentario || ''}
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
      {showButtons &&(
      <DecisionButtons
        rejectButtonText="Descartar"
        validateButtonText="Guardar Evaluación"
        onReject={handleCancel}
        onValidate={handleSave}
        disabledButton={0}
      />
      )}
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
