import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
} from "@mui/material";
import InfoSnackbar from "../../../components/infoSnackbar/infoSnackbar";
import BaseUI from "../../../components/baseUI/baseUI";

const RealizarEvaluacion = () => {
  const [evaluationData, setEvaluationData] = useState({
    type: "",
    evaluatee: "",
    criteria: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({
    error: false,
    errorMessage: "",
    errorDetails: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const [scores, setScores] = useState({});

  useEffect(() => {
    // Simulating data fetch from backend
    const fetchData = async () => {
      // Replace this with actual API call
      const data = {
        type: "Peer Evaluation",
        evaluatee: "John Doe",
        criteria: [
          { id: 1, description: "Communication Skills", maxScore: 25 },
          { id: 2, description: "Technical Knowledge", maxScore: 30 },
          { id: 3, description: "Teamwork", maxScore: 25 },
          { id: 4, description: "Problem Solving", maxScore: 20 },
        ],
      };
      setEvaluationData(data);
      const initialScores = {};
      data.criteria.forEach((criterion) => {
        initialScores[criterion.id] = 0;
      });
      setScores(initialScores);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleScoreChange = (id, value) => {
    const newValue = Math.min(
      Math.max(0, value),
      evaluationData.criteria.find((c) => c.id === id).maxScore
    );
    setScores((prevScores) => ({
      ...prevScores,
      [id]: newValue,
    }));
  };

  const calculateTotalScore = () => {
    return Object.values(scores).reduce((sum, score) => sum + Number(score), 0);
  };

  const handleSubmit = () => {
    // Here you would typically send the scores to your backend
    console.log("Submitting scores:", scores);
    setSnackbar({
        open: true,
        message: `Evaluacion realizada correctamente.`,
        severity: "success",
        autoHide: 60000,
      });
  };

  return (
    <BaseUI
      titulo={"REALIZAR EVALUACION"}
      ocultarAtras={false}
      confirmarAtras={true}
      dirBack={"/"}
      loading={loading}
      error={error}
    >
      <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h6">
          Tipo de Evaluacion: {evaluationData.type}
        </Typography>
        <Typography variant="h6">
          Evaluando a: {evaluationData.evaluatee}
        </Typography>
      </Paper>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Criterios</TableCell>
              <TableCell align="right">Nota Maxima</TableCell>
              <TableCell align="right">Tu Calificacion</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {evaluationData.criteria.map((criterion) => (
              <TableRow key={criterion.id}>
                <TableCell>{criterion.description}</TableCell>
                <TableCell align="right">{criterion.maxScore}</TableCell>
                <TableCell align="right">
                  <TextField
                    type="number"
                    value={scores[criterion.id]}
                    onChange={(e) =>
                      handleScoreChange(criterion.id, e.target.value)
                    }
                    inputProps={{
                      min: 0,
                      max: criterion.maxScore,
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        mt={3}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Typography variant="h6">
          Nota Total: {calculateTotalScore()} / 100
        </Typography>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Calificar Evaluacion
        </Button>
      </Box>
      <InfoSnackbar
        openSnackbar={snackbar.open}
        setOpenSnackbar={(open) => setSnackbar({ ...snackbar, open })}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </BaseUI>
  );
};

export default RealizarEvaluacion;

