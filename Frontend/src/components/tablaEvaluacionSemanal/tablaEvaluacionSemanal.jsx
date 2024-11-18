/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Box
} from "@mui/material";
import DecisionButtons from "../Buttons/decisionButtons";
import CuadroDialogo from "../cuadroDialogo/cuadroDialogo";
import InfoSnackbar from "../infoSnackbar/infoSnackbar";

const TablaEvaluacionSemanal = ({ sprint, comenta, showButtons = true }) => {
  const { idEmpresa} = useParams();
  const [comentarios, setComentarios] = useState([]);
  useEffect(() => {
    console.log(comenta)
    const iniciarComentarios = (
      sprint?.semana?.tareasEstudiante && Array.isArray(sprint.semana.tareasEstudiante)
        ? sprint.semana.tareasEstudiante.map((estudiante) => ({
            idSemana: sprint.semana.idSemana,
            idEstudiante: estudiante.idEstudiante,
            comentario: '',
            subido: false
          }))
        : []
    );
    const newComentarios = iniciarComentarios.map((comentario) => {
      // Busca si el estudiante tiene un comentario en "comenta"
      const indice = comenta.findIndex(
        (estudiante) => estudiante.idEstudiante === comentario.idEstudiante
      );
      
      // Si se encuentra, actualiza el comentario; si no, mantiene el comentario vacío
      return indice === -1 
        ? comentario  // Si no se encuentra, deja el comentario vacío
        : { ...comentario, comentario: comenta[indice].comentario, subido: true }; // Si se encuentra, actualiza el comentario
    });  
    //console.log(newComentarios);
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
    newComentarios[index] = {
      ...newComentarios[index],
      comentario: value,
    };
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
    const comentariosNoSubidos = comentarios.filter((comentario)=> comentario.subido === false)
    console.log(comentariosNoSubidos)
    try {  
      const response = await fetch(
        `http://localhost:8000/api/docente/evaluacion`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(comentariosNoSubidos),
        }
      );
      if(response.ok){
        console.log('se subio correctamente')
        setSnackbar({
            open: true,
            message: `Se guarod los comentarios correctamente`,
            severity: "success",
            autoHide: 6000,
        });
      }
    } catch (error) {
    console.error("Error al actualizar la tarea:", error);
        setSnackbar({
            open: true,
            message: `Hubo un error al momento de subir, error: ${error}`,
            severity: "error",
            autoHide: 60000,
        });
    }
  };

  return (
    <>
      {sprint.semana?.tareasEstudiante?.length > 0&&<TableContainer component={Paper}>
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
                  {!(comentarios[index]?.subido) && showButtons?
                    <TextField
                      multiline
                      rows={3}
                      defaultValue={''}
                      value={comentarios[index]?.comentario}
                      onChange={(e) => handleComentarioChange(index, e.target.value)}
                      fullWidth
                      placeholder="Ingrese un comentario"
                    />
                    :
                    <Box
                        
                        sx={{
                            textAlign: 'left',
                            minHeight: '70px',
                            padding: '8px',
                            border: '1px solid #e0e0e0',
                            borderRadius: '4px'
                        }}
                    >
                        {comentarios[index]?.comentario}
                    </Box>
                  }
                </TableCell>
              </TableRow>
            ))}
            
          </TableBody>
        </Table>
      </TableContainer>
      }
      {sprint.semana?.tareasEstudiante?.length < 1 &&<h2 style={{color:'red'}}>No Asignaron tareas a los estudiantes en este semana</h2>}
      {sprint.semana?.tareasEstudiante?.length > 0 && 
        showButtons && <DecisionButtons
        rejectButtonText="Descartar"
        validateButtonText="Guardar Evaluación"
        onReject={handleCancel}
        onValidate={handleSave}
        disabledButton={0}
        />
      }

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
