import { Button} from "@mui/material";
import CardGeneral from '../cardGeneral'
import { useNavigate } from "react-router-dom";
function CardResumen() {
  const fechaLimiteEntregaPlani = new Date(localStorage.getItem("fechaLimiteEntregaPlanificacion"))
  const paso = fechaLimiteEntregaPlani < new Date()
  const navigate = useNavigate()
  return (
    <CardGeneral
        titulo = "Seguimiento Semanal"
        info = {<>
        </>}
        buttons={<> 
        {!paso&&<p>Se habilitara cuando pase la fecha de entrega planificacion: {fechaLimiteEntregaPlani.toLocaleDateString()}</p>}
        <Button variant="contained" color="primary" fullWidth
          onClick = { () => navigate(`/homeDocente/listaEmpresasVerTareas`)}
          disabled={!paso}
        >
            38_VISUALIZAR TAREAS
        </Button>
        <Button variant="outlined" color="primary" fullWidth
          onClick= {() => navigate("/homeDocente/listaEmpresasEvaluacionSemanal")}
          disabled={!paso}
        >
            07_REALIZAR SEGUIMIENTO
        </Button>
        </>}
    />
  );
}

export default CardResumen;
  