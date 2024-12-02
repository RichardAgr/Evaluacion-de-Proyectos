import { Button } from "@mui/material";
import HomeCard, { ButtonsContainer, InfoRow, Title } from "../homeCard";
import { useNavigate } from "react-router-dom";
function CardEvaluacion() {
  const navigate = useNavigate();
  return (
    <HomeCard title="Evaluaciones">
      <ButtonsContainer>
        <InfoRow>
          <Title>

          </Title>
        </InfoRow>
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
