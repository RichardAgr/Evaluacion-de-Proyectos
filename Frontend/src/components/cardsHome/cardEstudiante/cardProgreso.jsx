import { Button } from "@mui/material";
import HomeCard, { ButtonsContainer } from "../homeCard";
import { useNavigate } from "react-router-dom";
function CardResumen() {
  const fechaFinPlanificacion = new Date(
    localStorage.getItem("fechaFinPlanificacion")
  );
  const paso = new Date() > fechaFinPlanificacion;

  const fechaLimiteEntregaPlanificacion = new Date(
    localStorage.getItem("fechaLimiteEntregaPlanificacion")
  );
  const empresa = localStorage.getItem("idEmpresa");
  const inicio = fechaLimiteEntregaPlanificacion < new Date();
  const navigate = useNavigate();
  return (
    <>
      <HomeCard title="Progreso del Proyecto">
        <ButtonsContainer>
          {!paso && inicio ? (
            <Button variant="contained" color="primary" fullWidth>
              SUBIR ENTREGABLES SPRINTS
            </Button>
          ) : (
            <></>
          )}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => navigate(`/visualizarSprint/empresa/${empresa}`)}
          >
            VISUALIZAR SPRINTS
          </Button>
        </ButtonsContainer>
      </HomeCard>
    </>
  );
}

export default CardResumen;
