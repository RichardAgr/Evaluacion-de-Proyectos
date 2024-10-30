import { useState, useEffect } from "react";
import InfoSnackbar from "../infoSnackbar/infoSnackbar";
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
import { useParams } from "react-router-dom";
const TablaEvaluacionSemanal = ({ idEmpresa }) => {
  const { idSprint } = useParams();
  const [teamData, setTeamData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notes, setNotes] = useState([]); // Estado separado para las notas
  const [comments, setComments] = useState([]); // Estado para los comentarios
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
  useEffect(() => {
    const getNotasSprint = async (empresaId, Sprint) => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/empresas/notaSprint?empresa=${empresaId}&numeroSprint=${Sprint}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) throw new Error("Error al obtener las notas del sprint");

        const data = await response.json();

        console.log(data);

        // Si data es un objeto con estudiantes
        
        const formattedData = Object.entries(data).map(([nombre, info]) => ({
          nombre,
          ...info,
        }));

        setTeamData(formattedData);
        console.log(formattedData);
        // Suponiendo que cada estudiante tiene propiedades 'nota' y 'comentario'
        const newNotes = formattedData.map((estudiante) => estudiante.nota || ""); // Maneja casos donde no haya nota
        const newComents = formattedData.map((estudiante) => estudiante.comentario || ""); // Maneja casos donde no haya comentario

        console.log(newNotes);
        setNotes(newNotes);
        console.log(newComents);
        setComments(newComents);
      } catch (error) {
        console.error("Error en la solicitud:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getNotasSprint(idEmpresa, idSprint);
  }, [idEmpresa]);

  const handleNoteChange = (index, value) => {
    const newValue = value === "" ? "" : Math.max(1, Math.min(100, Number(value)));
    const updatedNotes = [...notes];
    updatedNotes[index] = newValue; // Actualiza la nota en el estado de notas
    setNotes(updatedNotes); // Actualiza el estado de notas
  };

  const handleCommentChange = (index, value) => {
    const updatedComments = [...comments];
    updatedComments[index] = value; // Actualiza el comentario del miembro
    setComments(updatedComments); // Actualiza el estado
  };
  const handleSubmit = async () => {
    console.log(comments)
    const notasLlenadas = notes.map((note) => note || "1");
    console.log(notasLlenadas)
    const estudiantes = teamData.map((member) => member.id)
    console.log(estudiantes)
    try {
      const response = await fetch("http://127.0.0.1:8000/api/docente/evaluacion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          empresa: idEmpresa,
          numeroSprint: idSprint,
          notas: notasLlenadas,
          estudiantes: estudiantes,
          comentarios: comments,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json(); // Intenta obtener el mensaje de error
        throw new Error(errorData.message || "Error en el servidor"); // Lanza un error con el mensaje
      }
      
      setSnackbar({
        open: open,
        message: "Se Guardo Correctamente",
        severity: "succes",
        autoHide: 6000,
      });
      const result = await response.json();
      console.log("Éxito:", result.message);
    } catch (error) {
      console.error("Error:", error);
      setSnackbar({
        open: true,
        message: error.message,
        severity: "error",
      });
    }
  };
  
  
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
        "Esta acción guardará todos los cambios realizados en la tarea. ¿Está seguro?",
      onConfirm: handleSubmit,  
    });
  };

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      
      <TableContainer component={Paper}>
        <Table aria-label="team evaluation table" size="small">
          <TableHead>
            <TableRow>
              <TableCell>Integrante</TableCell>
              <TableCell>Tareas</TableCell>
              <TableCell>Nota (1-100)</TableCell>
              <TableCell>Comentario</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teamData.map((member, index) => (
              <TableRow key={index}>
                <TableCell>{member.nombre}</TableCell>
                <TableCell sx={{ py: 1 }}>
                  <ul style={{ margin: 0, paddingInlineStart: "20px" }}>
                    {member.tareas.map((task, taskIndex) => (
                      <li key={taskIndex}>{task}</li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell sx={{ py: 2 }}>
                  <TextField
                    type="number"
                    value={notes[index] || ""} 
                    onChange={(e) => handleNoteChange(index, e.target.value)}
                    inputProps={{ min: 1, max: 100 }} 
                    sx={{ width: "80px" }}
                    size="small"
                  />
                </TableCell>
                <TableCell sx={{ py: 1 }}>
                  <TextField
                    multiline
                    rows={4}
                    value={comments[index]} 
                    placeholder="Ingrese un comentario"
                    onChange={(e) => handleCommentChange(index, e.target.value)} 
                    fullWidth
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
        disabledButton= {0}
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
