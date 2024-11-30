import { Button} from "@mui/material";
import CardGeneral from '../cardGeneral'
function CardResumen() {
  const aceptada =Number(localStorage.getItem("aceptada"));
  const fechaLimiteEntregaPlani = new Date(localStorage.getItem("fechaLimiteEntregaPlanificacion"))
  const paso = fechaLimiteEntregaPlani > new Date()
  return (
    <CardGeneral
        titulo = "Planificacion"
        info = {<></>}
        buttons={<> 
        {(!aceptada&&paso)?<Button variant="contained" color="primary" fullWidth>
          CREAR PLANIFICACION
        </Button>:<></>}
        <Button variant="outlined" color="primary" fullWidth>
          VIZUALIZAR PLANIFICACIONES
        </Button>
        {(!aceptada&&paso)?<Button variant="contained" color="primary" fullWidth>
            PUBLICAR PLANIFICACION
        </Button>:<></>}
        </>}
    />
  );
}

export default CardResumen;
  