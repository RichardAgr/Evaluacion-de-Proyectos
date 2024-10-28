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
  const Sprint = "1"; // Puedes cambiar esto según sea necesario
  const [teamData, setTeamData] = useState([]);

  useEffect(() => {
    getNotasSprint(idEmpresa, Sprint);
  }, [idEmpresa]);

  const getNotasSprint = async (empresaId, Sprint) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/empresas/notaSprint?empresa=${empresaId}&numeroSprint=${Sprint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) throw new Error('Error al obtener las notas del sprint');

      const data = await response.json();
      setTeamData(data);
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert(error.message);
    }
  };

  const handleNoteChange = (index, value) => {
    const newValue = Math.max(1, Math.min(100, Number(value)))
    const updatedData = [...teamData]
    updatedData[index].nota = newValue
    setTeamData(updatedData)
  }

  const handleCommentChange = (index, value) => {
    const updatedData = [...teamData]
    updatedData[index].comentario = value
    setTeamData(updatedData)
  }

  const handleSaveEvaluation = async () => {
    try {
      const promises = teamData.map(async (member) => {
        const response = await fetch('http://127.0.0.1:8000/api/notaSprint/actualizar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            idEstudiante: member.idEstudiante,
            idSprint: Sprint,
            idEmpresa: idEmpresa,
            nota: member.nota,
            comentario: member.comentario,
          }),
        });

        if (!response.ok) {
          throw new Error('Error al actualizar la nota: ' + member.nombreEstudiante);
        }

        return response.json();
      });

      await Promise.all(promises);
      alert('Notas actualizadas correctamente.');
    } catch (error) {
      console.error('Error al guardar las evaluaciones:', error);
      alert('Error al guardar las evaluaciones.'); // Manejo de errores
    }
  };

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
                <TableCell>{member.nombreEstudiante} {member.primerApellido} {member.segundoApellido}</TableCell>
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
                    value={member.nota}
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
                    value={member.comentario}
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
        onValidate={handleSaveEvaluation}
      />
    </>
  );
};

export default TablaEvaluacionSemanal;
