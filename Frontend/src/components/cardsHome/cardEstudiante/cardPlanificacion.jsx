import { Button, Typography} from "@mui/material";
import CardGeneral from '../cardGeneral'
import { useNavigate } from "react-router-dom";
function CardResumen() {
  const aceptada =Number(localStorage.getItem("aceptada"));
  const fechaLimiteEntregaPlani = new Date(localStorage.getItem("fechaLimiteEntregaPlanificacion"))
  const paso = fechaLimiteEntregaPlani > new Date()
  const idPlanificacion =localStorage.getItem("idPlanificacion");
  const tienePlanificacion = idPlanificacion!=="-1";
  const empresa= localStorage.getItem("idEmpresa");
  const navigate = useNavigate();

  return (
    <CardGeneral
        titulo = "Planificacion"
        info = {<>
          <Typography>
            Fecha limite de entraga de la planificacion: {localStorage.getItem("fechaLimiteEntregaPlanificacion")} a las 23:59
          </Typography>
        </>}
        buttons={<> 
        {(aceptada!==1 && paso) ? (
          <Button variant="contained" color="primary" fullWidth onClick={()=>navigate(`/modificarPlanificacion/empresa/${empresa}`)}>
            {tienePlanificacion ? "MODIFICAR PLANIFICACIÓN" : "CREAR PLANIFICACIÓN"}
          </Button>
        ):<></>}
        {tienePlanificacion && <Button variant="outlined" color="primary" fullWidth
          onClick={()=>navigate(`/visualizarPlanificacion/empresa/${empresa}`)}
        >
          VIZUALIZAR PLANIFICACIONES
        </Button>}
        {((aceptada===0 || aceptada!==1) && paso && tienePlanificacion) ?
        <Button variant="contained" color="primary" 
          fullWidth
          onClick={()=>navigate(`/publicarPlanificacion/empresa/${empresa}`)}
        >
            PUBLICAR PLANIFICACION
        </Button>:<></>}
        </>}
    />
  );
}

export default CardResumen;
  