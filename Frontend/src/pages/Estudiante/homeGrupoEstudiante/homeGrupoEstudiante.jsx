import Footer from "../../../components/baseUI/Footer/footer.jsx";
import Header from "../../../components/baseUI/Header/header.jsx";
import { styled } from "@mui/material/styles";
import { Box, Typography} from "@mui/material";
import { Fragment, useEffect} from "react";
import CardProgreso from '../../../components/cardsHome/cardEstudiante/cardProgreso.jsx'
import CardPlanificacion from '../../../components/cardsHome/cardEstudiante/cardPlanificacion.jsx'
import CardListas from '../../../components/cardsHome/cardEstudiante/cardListas.jsx'
import CardGrupoEmpresa from '../../../components/cardsHome/cardEstudiante/cardGrupoEmpresa.jsx'
import CardEvaluacion from '../../../components/cardsHome/cardEstudiante/cardEvaluacion.jsx'
import CardTareas from '../../../components/cardsHome/cardEstudiante/cardTareas.jsx'
import { useNavigate } from "react-router-dom";
function HomeEstudiante() {
  const navigate =useNavigate()
  useEffect(()=>{
    const getOrigin = async() =>{
      const link = 'http://localhost:8000/api/estudiante/getDataEstudiante'
      const body = {
        method: "GET",
        headers: {"Content-Type": "application/json"},
        credentials: 'include'
      }
      
      fetch(link, body)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          return res.json();
        })
        .then((response) => {
          const tieneGrupo = response.idGrupo;
          if (tieneGrupo === -1) {
            localStorage.setItem("idEstudiante", response.idEstudiante);
            navigate("/GruposDocente");
          } else {
            localStorage.setItem("idEstudiante", response.idEstudiante);
            localStorage.setItem("nombreCompleto", response.nombreCompleto);
            localStorage.setItem("idEmpresa", response.idEmpresa);
            localStorage.setItem("idPlanificacion", response.idPlanificacion);
            localStorage.setItem("aceptada", response.aceptada);
            localStorage.setItem("publicada", response.publicada);
            localStorage.setItem("idSprint", response.idSprint);
            localStorage.setItem("idSemana", response.idSemana);
            localStorage.setItem("idGrupo", response.idGrupo);
            
            localStorage.setItem("empresaPublicada", response.empresaPublicada);
            localStorage.setItem("fechaIniGestion", response.fechaIniGestion);//desde aqui pueden crear empresas pero nada mas
            localStorage.setItem("fechaLimiteEntregaEmpresa", response.fechaLimiteEntregaEmpresa);//hasta esta fecha que entrega de empresas y fecha ini de entrega de plani
            localStorage.setItem("fechaLimiteEntregaPlanificacion", response.fechaLimiteEntregaPlanificacion);//fecha limite de entrega plani, y ini de los sprint
            localStorage.setItem("fechaFinPlanificacion", response.fechaFinPlanificacion);//fechafinplani hasta aqui terminan todos los sprints
            localStorage.setItem("fechaFinGestion", response.fechaFinGestion);//fecha fin gestion  
          }
        })
        .catch((error) => {
          console.log("Fetch error: ", error);
        });

    }
    getOrigin()
  },[])
  const nombreCompleto = localStorage.getItem("nombreCompleto")
  const aceptada =localStorage.getItem("aceptada");
  const empresaPublicada = localStorage.getItem("empresaPublicada")
  return (
    <Fragment>
      <Header />
      <Title variant="h5" sx={{marginTop:'5rem', textAlign:'center'}}>Bienvenid@, {nombreCompleto}</Title>
      <Container>
        {aceptada&&<CardProgreso></CardProgreso>}
        <CardGrupoEmpresa></CardGrupoEmpresa>        
        {empresaPublicada&&<CardPlanificacion></CardPlanificacion>}
        {aceptada&&<CardTareas></CardTareas>}
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