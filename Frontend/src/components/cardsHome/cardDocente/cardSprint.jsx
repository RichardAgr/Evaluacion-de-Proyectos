import { Button} from "@mui/material";
import CardGeneral from '../cardGeneral'
import { useNavigate } from "react-router-dom";
function CardResumen() {
  const fechaLimiteEntregaPlani = new Date(localStorage.getItem("fechaLimiteEntregaPlanificacion"))
  const paso = fechaLimiteEntregaPlani < new Date()
  const navigate = useNavigate()
  return (
    <CardGeneral
        titulo = "Segumiento Entregables Sprint"
        info = {<>
        </>}
        buttons={<> 
        {!paso&&<p>Se habilitara cuando pase la fecha de entrega planificacion: {fechaLimiteEntregaPlani.toLocaleDateString()}</p>}
        <Button variant="contained" color="primary" fullWidth disabled={!paso}>
            VISUALIZAR  SPRINT
        </Button>
        <Button 
          variant="outlined" 
          color="primary" 
          fullWidth 
          onClick = {() => navigate("/homeDocente/listaEmpresaCalificarSprints")}
          disabled={!paso}
        >
            34_CALIFICAR SPRINT
        </Button>
        </>}
    />
  );
}

export default CardResumen;