import { Button} from "@mui/material";
import CardGeneral from '../cardGeneral'
import { useNavigate } from "react-router-dom";
function CardResumen() {
  const navigate = useNavigate()
  return (
    <CardGeneral
        titulo = "Tareas"
        info = {<>
        </>}
        buttons={<> 
        <Button variant="contained" color="primary" fullWidth
          onClick={()=>navigate("/homeEstu/modificarListaTareas")}
        >
            40_MODIFICAR LISTA SEMANAL DE TAREAS
        </Button>
        <Button 
          variant="outlined" 
          color="primary" 
          fullWidth 
        >
            VISUALIZAR TAREAS
        </Button>
        <Button variant="contained" color="primary" fullWidth
          onClick={()=>navigate("/1/homeGrupoE/1/Empresas/1")}
        >
            08_MODIFICAR TAREAS
        </Button>
        </>}
    />
  );
}

export default CardResumen;