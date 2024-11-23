import { Box, Typography, Button} from "@mui/material";
import { styled } from "@mui/material";
import CardGeneral from '../cardGeneral'
import SchoolIcon from "@mui/icons-material/School";
import GroupIcon from "@mui/icons-material/Group";
import { useNavigate } from "react-router-dom";
function CardResumen() {
  const navigate = useNavigate();
  return (
    <CardGeneral
        titulo = "Resumen General"
        info = {<>
        <Box sx={{display:'flex'}}>    
                <SchoolIcon style={{ marginRight: "0.5rem" }} />
                <IconText>Estudiantes Inscritos</IconText>
                <Typography>25</Typography>
        </Box>
        <Box sx={{display:'flex'}} >
            <GroupIcon style={{ marginRight: "0.5rem" }} />
            <IconText>Grupo Empresas</IconText>
            <Typography>5</Typography>
        </Box>
        </>}
        buttons={<> 
        <Button variant="contained" color="primary" fullWidth onClick={() => navigate("/homeGrupo/1/listaEstudiantes/2024-2")} >
            32_LISTA DE ESTUDIANTES
        </Button>
        <Button variant="outlined" color="primary" fullWidth onClick={() => navigate("/homeGrupo/1/listaEmpresas/1")}>
            31LISTA DE GRUPO-EMPRESAS
        </Button>
        </>}
    />
  );
}

export default CardResumen;

const IconText = styled(Typography)({
    flexGrow: 1,
  });
  