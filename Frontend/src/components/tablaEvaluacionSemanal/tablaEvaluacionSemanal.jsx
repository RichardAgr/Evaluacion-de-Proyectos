import React, { useState, useEffect } from "react";
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

const TablaEvaluacionSemanal = ({ idEmpresa }) => {
  const Sprint = "1"; // Cambia según sea necesario
  const [teamData, setTeamData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notes, setNotes] = useState([]); // Estado separado para las notas
  const [comments, setComments] = useState([]); // Estado para los comentarios

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

        // Transforma el objeto a un arreglo de objetos con el nombre como campo adicional
        const formattedData = Object.entries(data).map(([nombre, info]) => ({
          nombre,
          ...info,
        }));

        setTeamData(formattedData);
        setNotes(Array(formattedData.length).fill("")); // Inicializa el array de notas vacío
        setComments(Array(formattedData.length).fill("")); // Inicializa el array de comentarios
      } catch (error) {
        console.error("Error en la solicitud:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getNotasSprint(idEmpresa, Sprint);
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
    const response = await fetch("http://127.0.0.1:8000/docente/evaluacion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        empresa: idEmpresa,
        numeroSprint: Sprint,
        notas: notes.map((note) => note || "1"), // Usa el estado de notas y convierte a vacío si es undefined
        estudiantes: teamData.map((member) => member.idEstudiante), // Obtén los IDs de estudiantes
        comentarios: comments, // Usa el estado de comentarios
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Error:", result);
    } else {
      console.log("Éxito:", result.message);
    }
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
              <TableRow key={member.idEstudiante}>
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
        onReject={() => {}}
        onValidate={() => {}}
        disabledButton= {1}
      />
    </>
  );
};

export default TablaEvaluacionSemanal;
