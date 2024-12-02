import { Button } from "@mui/material";
import HomeCard, { InfoRow, ButtonsContainer } from "../homeCard";
import { useNavigate } from "react-router-dom";
function CardPlanificacion() {
  const aceptada = Number(localStorage.getItem("aceptada"));
  const fechaLimiteEntregaPlani = new Date(
    localStorage.getItem("fechaLimiteEntregaPlanificacion")
  );
  const idPlanificacion =localStorage.getItem("idPlanificacion");
  const tienePlanificacion = idPlanificacion!=="-1";
  const aTiempo = new Date() < fechaLimiteEntregaPlani;
  const navigate = useNavigate();
  const empresa= localStorage.getItem("idEmpresa");
  console.log("idplanificacion");
  console.log(idPlanificacion);
  console.log(tienePlanificacion);
  return (
    <HomeCard title="Planificacion">
      <ButtonsContainer>
        {(aceptada!==1 && aTiempo) && (
          <Button variant="contained" color="primary" fullWidth onClick={()=>navigate(`/modificarPlanificacion/empresa/${empresa}`)}>
            {tienePlanificacion ? "MODIFICAR PLANIFICACIÓN" : "CREAR PLANIFICACIÓN"}
          </Button>
        )}
        {aceptada===1 &&(
        <Button variant="outlined" color="primary" fullWidth onClick={()=>navigate(`/visualizarPlanificacion/empresa/${empresa}`)}>
        VISUALIZAR PLANIFICACIONES
      </Button>
        )}

        {((aceptada===0 || aceptada!==1) && aTiempo && tienePlanificacion) && (
          <Button variant="contained" color="primary" fullWidth onClick={()=>navigate(`/publicarPlanificacion/empresa/${empresa}`)}>
            PUBLICAR PLANIFICACION
          </Button>
        )}
      </ButtonsContainer>
    </HomeCard>
  );
}

export default CardPlanificacion;
