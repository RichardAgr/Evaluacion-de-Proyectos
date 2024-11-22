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
        <Button variant="contained" color="primary" fullWidth>
            VISUALIZAR TAREAS
        </Button>
        <Button variant="outlined" color="primary" fullWidth
          onClick= {() => navigate("/homeGrupo/1/listaEmpresas/evaluacionSemanal")}
        >
            07_REALIZAR SEGUIMIENTO
        </Button>
        </>}
    />
  );
}

export default CardResumen;
  