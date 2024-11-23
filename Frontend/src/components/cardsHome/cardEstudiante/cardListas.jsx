import { Button} from "@mui/material";
import CardGeneral from '../cardGeneral'
import { useNavigate } from "react-router-dom";
function CardResumen() {
  const navigate = useNavigate();
  return (
    <CardGeneral
        titulo = "LISTAS Y NOTA"
        info = {<>
        </>}
        buttons={<>
        <Button variant="contained" color="primary" fullWidth onClick={() => navigate("/1/homeGrupoE/1/empresa/calificaciones/1")} >
            18_ VISUALIZAR NOTAS SPRINT
        </Button>
        <Button variant="outlined" color="primary" fullWidth onClick={() => navigate("/1/homeGrupoE/1/empresa/calificaciones/1")} >
            VISUALIZAR COMENTARIOS TAREAS SEMANA
        </Button>
        <Button variant="contained" color="primary" fullWidth onClick={() => navigate("")} >
            LISTA DE ESTUDIANTES
        </Button>
        <Button variant="contained" color="primary" fullWidth onClick={() => navigate("")} >
            LISTA DE GRUPO EMPRESAS
        </Button>
        </>}
    />
  );
}

export default CardResumen;