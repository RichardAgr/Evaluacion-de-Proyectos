import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import DecisionButtons from "../Buttons/decisionButtons";

const TablaEvaluacionSemanal = () => {
  const [teamData, setTeamData] = useState([
    {
      id: 1,
      name: "Alice Johnson",
      tasks: [
        "Design user interface",
        "Create wireframes",
        "Conduct user research",
      ],
      note: 85,
      comments:
        "Excellent work on the UI design. Consider incorporating more user feedback in future iterations.",
    },
    {
      id: 2,
      name: "Bob Smith",
      tasks: [
        "Develop backend API",
        "Implement database schema",
        "Write unit tests",
      ],
      note: 92,
      comments:
        "Outstanding performance on backend development. API documentation could be improved.",
    },
  ])

  const handleNoteChange = (index, value) => {
    const newValue = Math.max(1, Math.min(100, Number(value)))
    const updatedData = [...teamData]
    updatedData[index].note = newValue
    setTeamData(updatedData)
  }

  const handleCommentChange = (index, value) => {
    const updatedData = [...teamData]
    updatedData[index].comments = value
    setTeamData(updatedData)
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="team evaluation table" size="small">
          <TableHead>
            <TableRow>
              <TableCell >Integrante</TableCell>
              <TableCell >Tareas</TableCell>
              <TableCell >Nota (1-100)</TableCell>
              <TableCell >Comentario</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teamData.map((member, index) => (
              <TableRow key={member.id}>
                <TableCell >{member.name}</TableCell>
                <TableCell sx={{ py: 1 }}>
                  <ul style={{ margin: 0, paddingInlineStart: "20px" }}>
                    {member.tasks.map((task, taskIndex) => (
                      <li key={taskIndex}>{task}</li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell sx={{ py: 2 }}>
                  <TextField
                    type="number"
                    value={member.note}
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
                    value={member.comments}
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
  )
}

export default TablaEvaluacionSemanal
