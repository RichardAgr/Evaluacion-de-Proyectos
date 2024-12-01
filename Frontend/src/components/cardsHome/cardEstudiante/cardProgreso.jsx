import {Button, Typography} from "@mui/material";
import CardGeneral from '../cardGeneral'
import { useNavigate } from "react-router-dom";
function CardResumen() {
  const fechaFinPlanificacion = new Date(localStorage.getItem("fechaFinPlanificacion"))
  const paso = new Date()>fechaFinPlanificacion
  
  const fechaLimiteEntregaPlanificacion = new Date(localStorage.getItem("fechaLimiteEntregaPlanificacion"))
  const inicio = fechaLimiteEntregaPlanificacion < new Date()
  const navigate = useNavigate();
  const fechaLimiteEntrega = new Date(localStorage.getItem('fechaLimiteSprint'))
  return (
    <CardGeneral
        titulo = "Progreso del Proyecto"
        info = {<>
          <Typography>El Sprint actual termina el: {fechaLimiteEntrega.toLocaleDateString()}</Typography>
        </>}
        buttons={<> 
        {!paso && inicio?<Button variant="contained" color="primary" fullWidth >
          SUBIR ENTREGABLES SPRINTS
        </Button>:<></>}
        <Button variant="outlined" color="primary" fullWidth >
          VISUALIZAR SPRINTS
        </Button>
        </>}
    />
  );
}

export default CardResumen;
  