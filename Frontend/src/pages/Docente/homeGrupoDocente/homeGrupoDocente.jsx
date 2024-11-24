import Footer from "../../../components/baseUI/Footer/footer.jsx";
import Header from "../../../components/baseUI/Header/header.jsx";
import { styled } from "@mui/material/styles";
import { Box, Typography} from "@mui/material";
import { Fragment, useEffect} from "react";
import CardResumen from '../../../components/cardsHome/cardDocente/cardResumen.jsx'
import CardPlanificacion from '../../../components/cardsHome/cardDocente/cardPlanificacion.jsx'
import CardSprint from '../../../components/cardsHome/cardDocente/cardSprint.jsx'
import CardSeguimientoSemanal from '../../../components/cardsHome/cardDocente/cardSeguimientoSemanal.jsx'
import CardEvaluacion from '../../../components/cardsHome/cardDocente/cardEvaluacion.jsx'
import CardListaYDatos from '../../../components/cardsHome/cardDocente/cardListaYDatos.jsx'
function Home() {
  useEffect(()=>{
    const getOriginDocente= async () =>{
      const url = "http://localhost:8000/api/docente/getGrupo";
      const bodyFetch = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include"
      }

      fetch(url, bodyFetch)
        .then((res) => {
          res.json().then((response)=>{
            console.log(response)
            localStorage.setItem('idGrupo', response.idGrupo)
          })
        })
        .catch((error) => {
          console.error("Error:", error)
        })
    }
    getOriginDocente()
  },[])
  return (
    <Fragment>
      <Header />
      <Title variant="h5" sx={{marginTop:'5rem', textAlign:'center'}}>Bienvenid@, Ing. Blanco Coca Leticia</Title>
      <Container>
        <CardResumen></CardResumen>
        <CardPlanificacion></CardPlanificacion>
        <CardSprint></CardSprint>
        <CardSeguimientoSemanal></CardSeguimientoSemanal>
        <CardEvaluacion></CardEvaluacion>
        <CardListaYDatos></CardListaYDatos>
      </Container>
      <Footer />
    </Fragment>
  );
}

export default Home;


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