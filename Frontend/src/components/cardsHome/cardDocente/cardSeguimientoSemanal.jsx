import { Button} from "@mui/material";
import CardGeneral from '../cardGeneral'
import { useNavigate } from "react-router-dom";
function CardResumen() {
  const navigate = useNavigate()
  return (
    <CardGeneral
        titulo = "Seguimiento Semanal"
        info = {<>
        </>}
        buttons={<> 
        <Button variant="contained" color="primary" fullWidth
          onClick = { () => navigate(`/homeDocente/listaEmpresasVerTareas`)}
        >
            38_VISUALIZAR TAREAS
        </Button>
        <Button variant="outlined" color="primary" fullWidth
          onClick= {() => navigate("/homeDocente/listaEmpresasEvaluacionSemanal")}
        >
            07_REALIZAR SEGUIMIENTO
        </Button>
        </>}
    />
  );
}

export default CardResumen;
  