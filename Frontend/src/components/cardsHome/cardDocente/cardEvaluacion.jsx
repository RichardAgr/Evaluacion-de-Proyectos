import { Button} from "@mui/material";
import CardGeneral from '../cardGeneral'
function CardResumen() {
  return (
    <CardGeneral
        titulo = "EVALUACION"
        info = {<></>}
        buttons={<> 
        <Button variant="contained" color="primary" fullWidth>
            ENVIAR EVALUACIONES
        </Button>
        <Button variant="outlined" color="primary" fullWidth>
            VISUALIZAR EVALUACIONES
        </Button>
        </>}
    />
  );
}

export default CardResumen;
  