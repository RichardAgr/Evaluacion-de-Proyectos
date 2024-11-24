import { Button} from "@mui/material";
import CardGeneral from '../cardGeneral'
import { useNavigate } from "react-router-dom";
function CardResumen() {
  const navigate = useNavigate();
  return (
    <CardGeneral
        titulo = "Lista y Datos"
        info = {<>
        </>}
        buttons={<>
        <Button variant="outlined" color="primary" fullWidth onClick={() => navigate("/homeDocente/listaEmpresaCalificaciones")}>
            18_RECUPERAR CALIFICACIONES SPRINTS PREVIOS
        </Button>
        <Button variant="contained" color="primary" fullWidth onClick={() => navigate("/homeDocente/listaEmpresaVerCalificacionesSemanal")}>
            77_RECUPERAR SEGUIMIENTO SEMANALES PREVIOS
        </Button>
        </>}
    />
  );
}

export default CardResumen;