import React, { Fragment, useState,useEffect } from "react";
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

  const empresaId =1 ;
  const [nombreEmpresa, setNombreEmpresa] = useState({ nombreCorto: '', nombreLargo: '' });

  const getNombreEmpresa = async (empresaId) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/nombreEmpresa/${empresaId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) throw new Error('Error al obtener los datos de la empresa');

        const data = await response.json();    
        setNombreEmpresa({ nombreCorto: data.nombreEmpresa, nombreLargo: data.nombreLargo });
    } catch (error) {
        console.error('Error en la solicitud:', error);
        setError(error.message);
    }
  };
    useEffect(() => {
        getNombreEmpresa(empresaId);
    }, []);


  return (
    <Fragment>
      <BaseUI
        titulo={"EVALUAR HITO"}
        ocultarAtras={false}
        confirmarAtras={false}
        dirBack={"/"}
      > 
        <NombreEmpresa
          nombreCorto={nombreEmpresa.nombreCorto}
          nombreLargo={nombreEmpresa.nombreLargo}
        />
        <TablaEvaluacionSemanal idEmpresa={empresaId}/>
      </BaseUI>
    </Fragment>
  );
};

export default EvaluarHito;