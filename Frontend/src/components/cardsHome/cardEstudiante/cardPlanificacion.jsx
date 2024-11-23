import { Button} from "@mui/material";
import CardGeneral from '../cardGeneral'
function CardResumen() {
  return (
    <CardGeneral
        titulo = "Planificacion"
        info = {<></>}
        buttons={<> 
        <Button variant="contained" color="primary" fullWidth>
          CREAR PLANIFICACION
        </Button>
        <Button variant="outlined" color="primary" fullWidth>
          VIZUALIZAR PLANIFICACIONES
        </Button>
        <Button variant="contained" color="primary" fullWidth>
            PUBLICAR PLANIFICACION
        </Button>
        </>}
    />
  );
}

export default CardResumen;
  