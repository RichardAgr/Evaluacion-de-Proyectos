import { Button } from "@mui/material";
import HomeCard, { ButtonsContainer } from "../homeCard";
function CardResumen() {
  return (
    <HomeCard title="Evaluacion">
      <ButtonsContainer>
        <Button variant="contained" color="primary" fullWidth>
          REALIZAR EVALUACION
        </Button>
        <Button variant="outlined" color="primary" fullWidth>
          VISUALIZAR EVALUACIONES
        </Button>
      </ButtonsContainer>
    </HomeCard>
  );
}

export default CardResumen;
