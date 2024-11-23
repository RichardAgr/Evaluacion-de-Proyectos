import { Button} from "@mui/material";
import CardGeneral from '../cardGeneral'
function CardResumen() {
  return (
    <CardGeneral
        titulo = "Evaluacion"
        info = {<></>}
        buttons={<> 
        <Button variant="contained" color="primary" fullWidth>
            REALIZAR EVALUACION
        </Button>
        <Button variant="outlined" color="primary" fullWidth>
            VISUALIZAR EVALUACIONES
        </Button>
        </>}
    />
  );
}

export default CardResumen;
  