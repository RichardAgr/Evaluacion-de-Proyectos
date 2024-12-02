import { Button } from "@mui/material";
import HomeCard, { ButtonsContainer } from "../homeCard";
function CardResumen() {
  return (
    <HomeCard title="Evaluaciones">
      <ButtonsContainer>
        <Button variant="contained" color="primary" fullWidth>
          CONFIGURAR EVALUACIONES
        </Button>
        <Button variant="contained" color="primary" fullWidth>
          VISUALIZAR EVALUACIONES
        </Button>
      </ButtonsContainer>
    </HomeCard>
  );
}

export default CardResumen;
