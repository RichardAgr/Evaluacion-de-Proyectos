import { Button } from "@mui/material";
import HomeCard, { ButtonsContainer } from "../homeCard";

import { useNavigate } from "react-router-dom";
function CardPlanificacion() {
  const fechaLimiteEntregaEmpresa = new Date(
    localStorage.getItem("fechaLimiteEntregaEmpresa")
  );
  const paso = fechaLimiteEntregaEmpresa < new Date();
  const navigate = useNavigate();
  return (
    <HomeCard title="Planificacion">
      <ButtonsContainer>
        {!paso && (
          <p>
            Se habilitara cuando pase la fecha de entrega empresas:{" "}
            {fechaLimiteEntregaEmpresa.toLocaleDateString()}
          </p>
        )}
        <Button variant="contained" color="primary" fullWidth disabled={!paso} onClick={() => navigate("/visualizarPlanificacion")} >
          VISUALIZAR PLANIFICACIONES
        </Button>
        <Button variant="contained" color="primary" fullWidth disabled={!paso} onClick={() => navigate("/validarPlanificacion")}>
          VALIDAR PLANIFICACIONES
        </Button>
      </ButtonsContainer>
    </HomeCard>
  );
}

export default CardPlanificacion;
