import { Button} from "@mui/material";
import CardGeneral from '../cardGeneral'
import { useNavigate } from "react-router-dom";
function CardResumen() {
  const navigate = useNavigate()
  return (
    <CardGeneral
        titulo = "Grupo Empresa"
        info = {<>
        </>}
        buttons={<> 
        <Button variant="contained" color="primary" fullWidth
          onClick = { () => navigate("/homeEstudiante/homeGrupoEstudiante/crearGrupo/25")}
        >
            03_REGISTRAR GRUPO EMPRESA
        </Button>
        <Button variant="outlined" color="primary" fullWidth
          onClick= {() => navigate("/homeEstudiante/homeGrupoEstudiante/modificarGrupo/25")}
        >
            69_MODIFICAR GRUPO EMPRESA
        </Button>
        <Button variant="outlined" color="primary" fullWidth
          onClick= {() => navigate("/homeEstudiante/homeGrupoEstudiante/publicarEmpresa/25")}
        >
            71_PUBLICAR GRUPO EMPRESA
        </Button>
        </>}
    />
  );
}

export default CardResumen;
  