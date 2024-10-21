import React, { Fragment, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Button,
  Box,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BaseUI from "../../../components/baseUI/baseUI.jsx";
import CuadroNota from "../../../components/cuadroNota/cuadroNota.jsx";
import CuadroDialogo from "../../../components/cuadroDialogo/cuadroDialogo.jsx";
import CuadroComentario from "../../../components/cuadroComentario/cuadroComentario.jsx";
import TablaEvaluacionSemanal from "../../../components/tablaEvaluacionSemanal/tablaEvaluacionSemanal.jsx";
import EditarPlanificacion from "../../../components/editarTablaPlanificacion/editarTablaPlanificacion.jsx";
import NombreEmpresa from  "../../../components/infoEmpresa/nombreEmpresa.jsx";


const EvaluarHito = () => {



  return (
    <Fragment>
      <BaseUI
        titulo={"EVALUAR HITO"}
        ocultarAtras={false}
        confirmarAtras={false}
        dirBack={"/"}
      > 
        <NombreEmpresa
          nombreLargo={"Creative Harbor SRL"}
          nombreCorto={"Creative Harbor"}
        />
        <TablaEvaluacionSemanal/>
      </BaseUI>
    </Fragment>
  );
};

export default EvaluarHito;