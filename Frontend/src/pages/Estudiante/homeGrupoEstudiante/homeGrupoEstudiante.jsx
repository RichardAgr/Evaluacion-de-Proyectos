import Footer from "../../../components/baseUI/Footer/footer.jsx";
import Header from "../../../components/baseUI/Header/header.jsx";
import { styled } from "@mui/material/styles";
import { Box, Typography} from "@mui/material";
import { Fragment} from "react";
import CardProgreso from '../../../components/cardsHome/cardEstudiante/cardProgreso.jsx'
import CardPlanificacion from '../../../components/cardsHome/cardEstudiante/cardPlanificacion.jsx'
import CardListas from '../../../components/cardsHome/cardEstudiante/cardListas.jsx'
import CardGrupoEmpresa from '../../../components/cardsHome/cardEstudiante/cardGrupoEmpresa.jsx'
import CardEvaluacion from '../../../components/cardsHome/cardEstudiante/cardEvaluacion.jsx'
import CardTareas from '../../../components/cardsHome/cardEstudiante/cardTareas.jsx'
function HomeEstudiante() {
  const nombreCompleto = localStorage.getItem("nombreCompleto")
  return (
    <Fragment>
      <Header />
      <Title variant="h5" sx={{marginTop:'5rem', textAlign:'center'}}>Bienvenid@, {nombreCompleto}</Title>
      <Container>

        <CardProgreso></CardProgreso>
        <CardPlanificacion></CardPlanificacion>
        <CardTareas></CardTareas>
        <CardGrupoEmpresa></CardGrupoEmpresa>
        <CardEvaluacion></CardEvaluacion>
        <CardListas></CardListas>
      </Container>
      <Footer />
    </Fragment>
  );
}

export default HomeEstudiante;


const Container = styled(Box)({
  display: "flex",
  minHeight:'72.9vh',
  flexWrap:'wrap',
  alignItems:'center',
  justifyContent:'center'
});
const Title = styled(Typography)({
  marginBottom: "1rem",
  fontWeight: "bold",
});