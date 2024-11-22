import {Button} from "@mui/material";
import CardGeneral from '../cardGeneral'
import { useNavigate } from "react-router-dom";
function CardResumen() {
  const navigate = useNavigate();
  return (
    <CardGeneral
        titulo = "Progreso del Proyecto"
        info = {<></>}
        buttons={<> 
        <Button variant="contained" color="primary" fullWidth >
          SUBIR ENTREGABLES SPRINTS
        </Button>
        <Button variant="outlined" color="primary" fullWidth >
          VISUALIZAR SPRINTS
        </Button>
        </>}
    />
  );
}

export default CardResumen;
  