import { Button } from "@mui/material";
import HomeCard, { ButtonsContainer } from "../homeCard";
import { useNavigate } from "react-router-dom";
function CardEvaluacion() {
  const navigate = useNavigate();
  return (
    <HomeCard title="Evaluaciones">
      <ButtonsContainer>
        <Button variant="contained" color="primary" fullWidth onClick={()=>navigate("/configurarEvaluacion")}>
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
