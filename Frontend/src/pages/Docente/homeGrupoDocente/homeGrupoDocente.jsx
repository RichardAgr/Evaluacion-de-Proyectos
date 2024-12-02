import Footer from "../../../components/baseUI/Footer/footer.jsx";
import Header from "../../../components/baseUI/Header/header.jsx";
import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { CardContainer, Title } from "../../../components/cardsHome/homeCard.jsx";
import CardResumen from "../../../components/cardsHome/cardDocente/cardResumen.jsx";
import CardPlanificacion from "../../../components/cardsHome/cardDocente/cardPlanificacion.jsx";
import CardSprint from "../../../components/cardsHome/cardDocente/cardSprint.jsx";
import CardSeguimientoSemanal from "../../../components/cardsHome/cardDocente/cardSeguimientoSemanal.jsx";
import CardEvaluacion from "../../../components/cardsHome/cardDocente/cardEvaluacion.jsx";
import CardListaYDatos from "../../../components/cardsHome/cardDocente/cardListaYDatos.jsx";
import Loading from "../../../components/loading/loading.jsx";
import Error from "../../../components/error/error.jsx";
function Home() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({
    error: false,
    errorMessage: "",
    errorDetails: "",
  });
  useEffect(() => {
    const getOriginDocente = async () => {
      const url = "http://localhost:8000/api/docente/getGrupo";
      const bodyFetch = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      };

      try {
        const res = await fetch(url, bodyFetch);
        const response = await res.json();
        console.log(response);
        localStorage.setItem("idGrupo", response.idGrupo);
        localStorage.setItem("nombreCompleto", response.nombreCompleto);
        localStorage.setItem("gestion", response.gestion);
        localStorage.setItem("fechaIniGestion", response.fechaIniGestion);
        localStorage.setItem(
          "fechaLimiteEntregaEmpresa",
          response.fechaLimiteEntregaEmpresa
        );
        localStorage.setItem(
          "fechaLimiteEntregaPlanificacion",
          response.fechaLimiteEntregaPlanificacion
        );
        localStorage.setItem(
          "fechaFinPlanificacion",
          response.fechaFinPlanificacion
        );
        localStorage.setItem("fechaFinGestion", response.fechaFinGestion);
        localStorage.setItem("numEstudiantes", response.numEstudiantes);
        localStorage.setItem("numEmpresas", response.numEmpresas);
        setLoading(false);
        setError({ error: false, errorMessage: "", errorDetails: "" });
      } catch (error) {
        console.log(error);
        setError({
          error: true,
          errorMessage: "Ha ocurrido un error",
          errorDetails: error.message,
        });
      }
    };
    getDatosLogin();
  }, []);

  return (
    <>
      <Header />
      {loading ? (
        <Loading />
      ) : error.error===true ? (
        <Error />
      ) : (
        <>
          <Title variant="h5" sx={{ marginTop: "5rem", textAlign: "center" }}>
            Bienvenid@, Ing. {localStorage.getItem("nombreCompleto")}
          </Title>
          <Title variant="h6" sx={{ textAlign: "center" }}>
            {localStorage.getItem("gestion")}
          </Title>
          <CardContainer>
            <CardResumen />
            <CardPlanificacion />
            <CardSprint />
            <CardSeguimientoSemanal />
            <CardEvaluacion />
            <CardListaYDatos />
          </CardContainer>
        </>
      )}

      <Footer />
    </>
  );
}

export default Home;


