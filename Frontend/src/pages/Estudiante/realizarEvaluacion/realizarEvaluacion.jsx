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
import { getDatosParaEvaluar } from "../../../api/realizarEvaluacion/realizarEvaluacion";

const RealizarEvaluacion = () => {
  const [evaluationData, setEvaluationData] = useState({
    tipoEvaluacion: "",
    fechaEvaluacion: "",
    evaluado: "",
    criterios: [],
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
  console.log(evaluationData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const idEstudiante = localStorage.getItem("idEstudiante");
        const response = await getDatosParaEvaluar(idEstudiante);

        console.log(response); // Verifica que la respuesta es correcta
        if (response.error) {
          setError({
            error: true,
            errorMessage: "Error al cargar los datos de evaluación",
            errorDetails: response.error,
          });
        } else {
          // Establece los datos de evaluación
          setEvaluationData(response);

          // Inicializa los scores con los criterios de la respuesta
          const initialScores = {};
          response.criterios.forEach((criterio) => {
            initialScores[criterio.id] = 0;
          });

          setScores(initialScores);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error al obtener datos:", error);
        setError({
          error: true,
          errorMessage: "Error al cargar los datos de evaluación",
          errorDetails: error.message,
        });
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleScoreChange = (id, value) => {
    const criterio = evaluationData.criterios.find((c) => c.id === id);
    const newValue = Math.min(
      Math.max(0, parseInt(value, 10) || 0),
      criterio ? criterio.rangoMaximo : 0
    );
    setScores((prevScores) => ({
      ...prevScores,
      [id]: newValue,
    }));
  };

  const calculateTotalScore = () => {
    return evaluationData.criterios.reduce(
      (sum, criterio) => sum + (scores[criterio.id] || 0),
      0
    );
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
          Tipo de Evaluacion:{" "}
          {evaluationData.tipoEvaluacion === "autoevaluacion"
            ? "Autoevaluación"
            : evaluationData.tipoEvaluacion === "evaluacionCruzada"
            ? "Evaluación Cruzada"
            : "Evaluación de Pares"}
        </Typography>
        <Typography variant="h6">
          Evaluando a: {evaluationData.evaluado ? evaluationData.evaluado : ""}
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
            {evaluationData.criterios &&
              evaluationData.criterios.map((criterio) => (
                <TableRow key={criterio.id}>
                  <TableCell>{criterio.descripcion}</TableCell>
                  <TableCell align="right">{criterio.rangoMaximo}</TableCell>
                  <TableCell align="right">
                    <TextField
                      type="number"
                      value={scores[criterio.id] || 0}
                      onChange={(e) =>
                        handleScoreChange(criterio.id, e.target.value)
                      }
                      inputProps={{
                        min: 0,
                        max: criterio.rangoMaximo,
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
