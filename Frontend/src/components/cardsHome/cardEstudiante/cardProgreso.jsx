import {Button} from "@mui/material";
import CardGeneral from '../cardGeneral'
import { useNavigate } from "react-router-dom";
function CardResumen() {
  const fechaFinPlanificacion = new Date(localStorage.getItem("fechaFinPlanificacion"))
  const paso = new Date()>fechaFinPlanificacion
  
  const fechaLimiteEntregaPlanificacion = new Date(localStorage.getItem("fechaLimiteEntregaPlanificacion"))
  const inicio = fechaLimiteEntregaPlanificacion < new Date()
  const navigate = useNavigate();
  return (
    <CardGeneral
        titulo = "Progreso del Proyecto"
        info = {<></>}
        buttons={<> 
        {!paso && inicio&&<Button variant="contained" color="primary" fullWidth >
          SUBIR ENTREGABLES SPRINTS
        </Button>}
        <Button variant="outlined" color="primary" fullWidth >
          VISUALIZAR SPRINTS
        </Button>
        </>}
    />
  );
}

export default CardResumen;
  