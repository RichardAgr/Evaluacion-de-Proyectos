import { Button} from "@mui/material";
import CardGeneral from '../cardGeneral'
function CardResumen() {
  const fechaLimiteEntregaEmpresa = new Date(localStorage.getItem("fechaLimiteEntregaEmpresa"))
  const paso = fechaLimiteEntregaEmpresa < new Date()
  const fecha = new Date(localStorage.getItem("fechaLimiteEntregaEmpresa"))
  fecha.setDate(fecha.getDate() + 1);
  return (
    <CardGeneral
        titulo = "Planificacion"
        info = {<></>}
        buttons={<> 
        {!paso&&<p>Se habilitara cuando pase la fecha de entrega de empresas: {fecha.toISOString().split('T')[0]}</p>}
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
  