import { Box, Button, Typography } from "@mui/material";
import HomeCard, { ButtonsContainer, InfoRow, Title } from "../homeCard";
import { useNavigate } from "react-router-dom";
function CardEvaluacion() {
  const navigate = useNavigate();
  const fechaEvaluacion = localStorage.getItem("fechaEvaluacion");
  const tipoEvaluacion = localStorage.getItem("tipoEvaluacion");
  console.log(fechaEvaluacion, tipoEvaluacion);
  return (
    <HomeCard title="Evaluaciones">
      <InfoRow>
        <Box>
          {fechaEvaluacion !== "undefined" && fechaEvaluacion !== null && (
            <Typography>Fecha de evaluacion: {fechaEvaluacion}</Typography>
          )}
          {tipoEvaluacion !== "undefined" && tipoEvaluacion !== null && (
            <Typography>tipo de evaluacion: {tipoEvaluacion}</Typography>
          )}
        </Box>
      </InfoRow>
      <ButtonsContainer>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => navigate("/configurarEvaluacion")}
        >
          CONFIGURAR EVALUACIONES
        </Button>
        <Button variant="contained" color="primary" fullWidth>
          VISUALIZAR EVALUACIONES
        </Button>
      </ButtonsContainer>
    </HomeCard>
  );
}

export default CardEvaluacion;
