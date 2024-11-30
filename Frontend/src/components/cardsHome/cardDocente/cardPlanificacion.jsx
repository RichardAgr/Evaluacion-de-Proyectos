import { Button} from "@mui/material";
import CardGeneral from '../cardGeneral'
function CardResumen() {
  const fechaLimiteEntregaEmpresa = new Date(localStorage.getItem("fechaLimiteEntregaEmpresa"))
  const paso = fechaLimiteEntregaEmpresa < new Date()
  return (
    <CardGeneral
        titulo = "Planificacion"
        info = {<></>}
        buttons={<> 
        {!paso&&<p>Se habilitara cuando pase la fecha de entrega empresas: {fechaLimiteEntregaEmpresa.toLocaleDateString()}</p>}
        <Button variant="contained" color="primary" fullWidth disabled={!paso}>
            VIZUALIZAR PLANIFICACIONES
        </Button>
        <p></p>
        <Button variant="contained" color="primary" fullWidth disabled={!paso}>
            VALIDAR PLANIFICACIONES
        </Button>
        </>}
    />
  );
}

export default CardResumen;
  