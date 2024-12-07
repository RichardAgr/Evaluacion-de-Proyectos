import { Button, Typography} from "@mui/material";
import CardGeneral from '../cardGeneral'
import { useNavigate } from "react-router-dom";
function CardResumen() {
  const aceptada =Number(localStorage.getItem("aceptada"));
  const fechaLimiteEntregaPlani = new Date(`${localStorage.getItem("fechaLimiteEntregaPlanificacion")}T23:59:58`)
  const pasoFechaLimite = fechaLimiteEntregaPlani >= new Date()
  const idPlanificacion =localStorage.getItem("idPlanificacion");
  const tienePlanificacion = idPlanificacion!=="-1";
  const empresa= localStorage.getItem("idEmpresa");
  const fechaLimiteEntregaEmpresa = new Date(`${localStorage.getItem("fechaLimiteEntregaEmpresa")}T23:59:59`);
  const inicio = fechaLimiteEntregaEmpresa < new Date()
  const navigate = useNavigate();
  console.log(inicio);
  console.log(pasoFechaLimite);
  console.log(aceptada !== 1);

  return (
    <CardGeneral
        titulo = "Planificacion"
        info = {<>
          <Typography>
            Fecha inical para la entraga de la planificacion: {localStorage.getItem("fechaLimiteEntregaEmpresa")} a las 00:00
          </Typography>
          <Typography>
            Fecha limite de entraga de la planificacion: {localStorage.getItem("fechaLimiteEntregaPlanificacion")} a las 23:59
          </Typography>
        </>}
        buttons={<> 
        {(aceptada !==1 && pasoFechaLimite && inicio) ? (
          <Button variant="contained" color="primary" fullWidth onClick={()=>navigate(`/modificarPlanificacion/empresa/${empresa}`)}>
            {tienePlanificacion ? "MODIFICAR PLANIFICACIÓN" : "CREAR PLANIFICACIÓN"}
          </Button>
        ):<></>}
        {tienePlanificacion && pasoFechaLimite && <Button variant="outlined" color="primary" fullWidth
          onClick={()=>navigate(`/visualizarPlanificacion/empresa/${empresa}`)}
        >
          VIZUALIZAR PLANIFICACIONES
        </Button>}
        {((aceptada===0 || aceptada!==1) && pasoFechaLimite && tienePlanificacion) ?
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
  