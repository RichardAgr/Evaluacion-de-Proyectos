import { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getEmpresaCalificaciones } from "../../../api/getEmpresa";
import BaseUI from "../../../components/baseUI/baseUI";
import NombreEmpresa from "../../../components/infoEmpresa/nombreEmpresa";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function CalificacionesHitoEmpresa() {
  const { idEmpresa } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [empresaData, setEmpresaData] = useState(null);
  const [mensaje, setMensaje] = useState(null); // Para manejar los mensajes

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEmpresaCalificaciones(idEmpresa);
        if (data.mensaje) {
          setMensaje(data.mensaje);
        } else {
          setEmpresaData(data);
        }
        setLoading(false);
      } catch (error) {
        setError("Error al cargar las calificaciones");
        setLoading(false);
      }
    };
    fetchData();
  }, [idEmpresa]);

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>Error: {error}</p>;
  if (mensaje) return <p>{mensaje}</p>; // Mostrar mensaje si no hay datos

  const { nombre, nombreLargo, calificaciones } = empresaData;

  return (
    <Fragment>
      <BaseUI
        titulo="VISUALIZAR CALIFICACIONES DE LA GRUPO EMPRESA"
        ocultarAtras={false}
        confirmarAtras={false}
        dirBack="/"
      >
        <NombreEmpresa
          nombreLargo={nombreLargo}
          nombreCorto={nombre}
        ></NombreEmpresa>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="calificaciones table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Nombre del Integrante</TableCell>
                {calificaciones[0]?.promediosPorSprint.map((_, index) => (
                  <TableCell key={index} align="center">
                    Hito {index + 1}
                  </TableCell>
                ))}
                <TableCell align="center">Evaluación Final</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {calificaciones.map((calificacion, index) => (
                <TableRow key={index}>
                  <TableCell align="center">
                    {`${calificacion.estudiante.nombre} ${calificacion.estudiante.primerApellido} ${calificacion.estudiante.segundoApellido}`}
                  </TableCell>
                  {calificacion.promediosPorSprint.map((hito, hitoIndex) => (
                    <TableCell key={hitoIndex} align="center">
                      {hito.promedio !== null ? hito.promedio : 0}
                    </TableCell>
                  ))}
                  <TableCell align="center">
                    {calcularPromedioFinal(calificacion.promediosPorSprint)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </BaseUI>
    </Fragment>
  );
}

const calcularPromedioFinal = (promediosPorSprint) => {
  const suma = promediosPorSprint.reduce(
    (acc, hito) => acc + (hito.promedio !== null ? hito.promedio : 0),
    0
  );
  return (suma / promediosPorSprint.length).toFixed(2);
};

export default CalificacionesHitoEmpresa;
