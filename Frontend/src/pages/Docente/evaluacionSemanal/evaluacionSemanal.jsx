import { Fragment, useState, useEffect } from "react";
import BaseUI from "../../../components/baseUI/baseUI.jsx";
import TablaEvaluacionSemanal from "../../../components/tablaEvaluacionSemanal/tablaEvaluacionSemanal.jsx";
import NombreEmpresa from "../../../components/infoEmpresa/nombreEmpresa.jsx";
import { getNotas } from "../../../api/getSprintsEmpresa.jsx";
import Loading from "../../../components/loading/loading.jsx";
import InfoSnackbar from "../../../components/infoSnackbar/infoSnackbar.jsx";
import { Filter } from "@mui/icons-material";

const EvaluarHito = () => {
  const idEmpresa = 1;
  const semana = 1 ; 

  const [data2, setData] = useState([]);
  const [empresa, setNombreEmpresa] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getNotas(idEmpresa, semana);
        
        const dataFormato = Object.keys(data).map(clave => {
          console.log(`${clave}: ${data[clave]}`);
          return {
              nombreCompleto: clave,
              comentario: data[clave].comentario,
              nota: data[clave].nota,
              tareas: data[clave].tareas,
              idEstudiante: data[clave].id
          };
      });
        setData(dataFormato);
        console.log(dataFormato);
      } catch (error) {
        console.error("Error en la solicitud:", error);
        setError("Error al obtener los datos del sprint");
        setSnackbar({
          open: true,
          message: "Error al obtener los datos del sprint",
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    const getNombreEmpresa = async () => {
      try {
          const response = await fetch(`http://127.0.0.1:8000/api/nombreEmpresa/${idEmpresa}`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
              },
          });

          if (!response.ok) throw new Error('Error al obtener los datos de la empresa');

          const data = await response.json();
          console.log(data)    
          setNombreEmpresa({ nombreCorto: data.nombreEmpresa, nombreLargo: data.nombreLargo });
      } catch (error) {
          console.error('Error en la solicitud:', error);
          setError(error.message);
      }finally{
        setLoading(false)
      }
  };
    getNombreEmpresa();
    fetchData();
  }, [idEmpresa, semana]);

  return (
    <Fragment>
      <BaseUI
        titulo="EVALUACION SEMANAL"
        ocultarAtras={false}
        confirmarAtras={false}
        dirBack="/"
      >
        {error ? (
          <p>Error: {error}</p>
        ) : loading ? (
          <Loading />
        ) : (
          <>
            <NombreEmpresa
              nombreCorto={empresa.nombreCorto}
              nombreLargo={empresa.nombreLargo}
            />
            {data2.length > 0 && <TablaEvaluacionSemanal estudiantes={data2} idSprint={semana} />}
          </>
         )} 
      </BaseUI>
      <InfoSnackbar
        openSnackbar={snackbar.open}
        setOpenSnackbar={(open) => setSnackbar({ ...snackbar, open })}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </Fragment>
  );
};

export default EvaluarHito;