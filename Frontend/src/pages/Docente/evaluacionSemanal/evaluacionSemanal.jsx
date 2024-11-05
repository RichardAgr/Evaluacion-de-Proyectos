import { Fragment, useState, useEffect } from "react";
import BaseUI from "../../../components/baseUI/baseUI.jsx";
import TablaEvaluacionSemanal from "../../../components/tablaEvaluacionSemanal/tablaEvaluacionSemanal.jsx";
import NombreEmpresa from "../../../components/infoEmpresa/nombreEmpresa.jsx";
import { useParams } from "react-router-dom";
import { getSprintEstudiantes } from "../../../api/getSprintsEmpresa.jsx";
import Loading from "../../../components/loading/loading.jsx";
import InfoSnackbar from "../../../components/infoSnackbar/infoSnackbar.jsx";

const EvaluarHito = () => {
  const { idEmpresa, idSprint } = useParams();
  const [data, setData] = useState(null);
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
        const data = await getSprintEstudiantes(idEmpresa, idSprint);
        setData(data);
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

    fetchData();
  }, [idEmpresa, idSprint]);

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
              nombreCorto={data.empresa.nombre}
              nombreLargo={data.empresa.nombreLargo}
            />
            <TablaEvaluacionSemanal estudiantes={data.estudiantes} />
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