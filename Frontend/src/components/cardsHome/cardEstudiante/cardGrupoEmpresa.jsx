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
          onClick = { () => navigate("/homeEstu/CrearGrupoEmpresa")}
        >
            03_REGISTRAR GRUPO EMPRESA
        </Button>
        <Button variant="outlined" color="primary" fullWidth
          onClick= {() => navigate("/homeEstu/ModificarGrupoEmpresa")}
        >
            69_MODIFICAR GRUPO EMPRESA
        </Button>
        <Button variant="outlined" color="primary" fullWidth
          onClick= {() => navigate("/homeEstu/PublicarGrupoEmpresa")}
        >
            71_PUBLICAR GRUPO EMPRESA
        </Button>
        </>}
    />
  );
}

export default CardResumen;
  