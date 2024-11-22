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
        <Button variant="contained" color="primary" fullWidth onClick={() => navigate("/homeGrupo/1/listaEstudiantes/2024-2")} >
            LISTA DE ESTUDIANTES
        </Button>
        <Button variant="outlined" color="primary" fullWidth onClick={() => navigate("/homeGrupo/1/empresa/calificaciones")}>
            18_RECUPERAR CALIFICACIONES SPRINTS PREVIOS
        </Button>
        <Button variant="contained" color="primary" fullWidth onClick={() => navigate("/homeEstudiante/visCalificar")}>
            77_RECUPERAR SEGUIMIENTO SEMANALES PREVIOS
        </Button>
        </>}
    />
  );
}

export default CardResumen;