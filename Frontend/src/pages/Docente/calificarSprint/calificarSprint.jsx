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

const CalificarSprint = () => {
  const [hitos, setHitos] = useState([
    {
      nombre: "Hito 1",
      calificacionGeneral: 0,
      nota: "",
      comentario: "",
      evaluaciones: [
        {
          semana: 1,
          tareas: [
            {
              nombre: "Tarea 1",
              descripcion: "Recopilación de requisitos",
              calificacion: 80,
            },
            {
              nombre: "Tarea 2",
              descripcion: "Desarrollo de arquitectura",
              calificacion: 73,
            },
          ],
        },
        {
          semana: 2,
          tareas: [
            {
              nombre: "Tarea 3",
              descripcion: "Diseño de interfaz de usuario",
              calificacion: 91,
            },
            {
              nombre: "Tarea 4",
              descripcion: "Implementación de base de datos",
              calificacion: 38,
            },
          ],
        },
      ],
    },
    {
      nombre: "Hito 2",
      calificacionGeneral: 0,
      nota: "",
      comentario: "",
      evaluaciones: [
        {
          semana: 3,
          tareas: [
            {
              nombre: "Tarea 5",
              descripcion: "Desarrollo de funcionalidades principales",
              calificacion: 45,
            },
            {
              nombre: "Tarea 6",
              descripcion: "Pruebas unitarias",
              calificacion: 100,
            },
          ],
        },
      ],
    },
  ]);

  const calcularPromedioHito = (hito) => {
    let total = 0;
    let count = 0;
    hito.evaluaciones.forEach((evaluacion) => {
      evaluacion.tareas.forEach((tarea) => {
        total += tarea.calificacion;
        count++;
      });
    });
    return count > 0 ? (total / count).toFixed(2) : "N/A";
  };

  const handleCalificacionGeneralChange = (hitoIndex, valor) => {
    const nuevosHitos = [...hitos];
    nuevosHitos[hitoIndex].calificacionGeneral = valor;
    setHitos(nuevosHitos);
  };

  const handleNotaChange = (hitoIndex, valor) => {
    const nuevosHitos = [...hitos];
    nuevosHitos[hitoIndex].nota = valor;
    setHitos(nuevosHitos);
  };

  const handleComentarioChange = (hitoIndex, valor) => {
    const nuevosHitos = [...hitos];
    nuevosHitos[hitoIndex].comentario = valor;
    setHitos(nuevosHitos);
  };

  const guardarEvaluacion = () => {
    console.log("Evaluación guardada:", hitos);
    // Aquí puedes implementar la lógica para guardar la evaluación en tu backend
  };

  return (
    <Fragment>
      <BaseUI
        titulo={"CALIFICAR HITOS"}
        ocultarAtras={false}
        confirmarAtras={false}
        dirBack={"/"}
      > 
        <Typography variant="h4" component="h1" gutterBottom>
          Creative Harbor SRL
        </Typography>
        {hitos.map((hito, hitoIndex) => (
          <Card key={hitoIndex} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h5" component="h2">
                {hito.nombre}
              </Typography>
              {hito.evaluaciones.map((evaluacion, evaluacionIndex) => (
                <Accordion key={evaluacionIndex}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Semana {evaluacion.semana}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {evaluacion.tareas.map((tarea, tareaIndex) => (
                      <Box key={tareaIndex} sx={{ mb: 2 }}>
                        <Grid container spacing={2} alignItems="center">
                          <Grid item xs={12} sm={8}>
                            <Typography variant="body1">
                              <strong>{tarea.nombre}:</strong>{" "}
                              {tarea.descripcion}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <Typography variant="body1">
                              Calificación: {tarea.calificacion}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    ))}
                  </AccordionDetails>
                </Accordion>
              ))}
              <Box sx={{ mt: 2 }}>
                <Typography variant="body1">
                  Promedio de las tareas: {calcularPromedioHito(hito)}
                </Typography>
              </Box>
              <CuadroNota
                title={`Nota para ${hito.nombre} :`}
                onNoteChange={(value) => handleNotaChange(hitoIndex, value)}
              />
              <CuadroComentario
                title={`Comentario para ${hito.nombre}`}
                maxChars={500}
                onTextChange={(value) => handleComentarioChange(hitoIndex, value)}
              />
            </CardContent>
          </Card>
        ))}
        <Button variant="contained" color="primary" onClick={guardarEvaluacion}>
          Guardar Evaluación
        </Button>
      </BaseUI>
    </Fragment>
  );
};

export default CalificarSprint;