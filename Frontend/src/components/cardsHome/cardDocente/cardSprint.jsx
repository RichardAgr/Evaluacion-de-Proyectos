import { Button} from "@mui/material";
import CardGeneral from '../cardGeneral'
import { useNavigate } from "react-router-dom";
function CardResumen() {
  const navigate = useNavigate()
  return (
    <CardGeneral
        titulo = "Resumen General"
        info = {<>
        </>}
        buttons={<> 
        <Button variant="contained" color="primary" fullWidth>
            VISUALIZAR  SPRINT
        </Button>
        <Button 
          variant="outlined" 
          color="primary" 
          fullWidth 
          onClick = {() => navigate("/homeDocente/listaEmpresaCalificarSprints")}
        >
            34_CALIFICAR SPRINT
        </Button>
        </>}
    />
  );
}

export default CardResumen;