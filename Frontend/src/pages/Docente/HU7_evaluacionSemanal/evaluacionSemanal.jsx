import { Fragment, useState, useEffect } from "react";
import BaseUI from "../../../components/baseUI/baseUI.jsx";
import TablaEvaluacionSemanal from "../../../components/tablaEvaluacionSemanal/tablaEvaluacionSemanal.jsx";
import NombreEmpresa from "../../../components/infoEmpresa/nombreEmpresa.jsx";
import { getSeguimiento } from "../../../api/seguimientoSemanal.jsx";
import InfoSnackbar from "../../../components/infoSnackbar/infoSnackbar.jsx";
import { useParams } from "react-router-dom";
const SeguimientoSemanal = () => {
  const {idGrupo, idEmpresa, idSprint, idSemana} = useParams()
  const [data2, setData] = useState([]);
  const [comentarios, setComentarios] = useState([]);
  const [empresa, setNombreEmpresa] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [mostrarBotones, setMostrarBotones] = useState(false)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const [sprints, setSprints] = useState(null)
  useEffect(() => {
    const fetchData = async () => {try {
        const data = await getSeguimiento(idEmpresa);
        const sprintElegido = data.find((sprint) => sprint.idSprint === Number(idSprint));
        const semanaElegida = sprintElegido.semanas?.find((semana) => semana.idSemana === Number(idSemana));
        const newData = {
          idSprint: sprintElegido.idSprint,
          numSprint: sprintElegido.numSprint,
          semana: semanaElegida,
        };
        setData(newData);
      } catch (error) {
        console.error("Error en la solicitud:", error);
        setError(true);
        setSnackbar({
          open: true,
          message: error.message || "Error al obtener los datos del sprint",
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    
    };

    const getNombreEmpresa = async () => {
      try {
          const response = await fetch(`http://127.0.0.1:8000/api/empresa/${idEmpresa}`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
              },
          });

          if (!response.ok) throw new Error('Error al obtener los datos de la empresa');

          const data = await response.json();
          setNombreEmpresa({ nombreCorto: data.nombreEmpresa, nombreLargo: data.nombreLargo, integrantes: data.integrantes });
          console.log(data)
      } catch (error) {
          console.error('Error en la solicitud:', error);
          setError(true);
      }finally{
        setLoading(false)
      }
    };
    const getComentarios = async () => {
      try {
          const response = await fetch(`http://localhost:8000/api/seguimientoSemanalComentarios/semanaElegida/${idSemana}`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
              },
          });
          const responseData = await response.json();
          setComentarios(responseData)
          if (!response.ok) throw new Error('Error al obtener los datos de los comentarios');
      } catch (error) {
          console.error('Error en la solicitud:', error);
          setError(true);
      }finally{
        setLoading(false)
      }
    };
    getComentarios();
    getNombreEmpresa();
    fetchData();
  }, []);
  useEffect(() => {
    if (!data2 || !data2.semana || !empresa || !empresa.integrantes) return;
    const resSemana = data2.semana;
    if (!resSemana.tareasEstudiante) return;
    const nuevaListaTareasEstudiante = [
      ...resSemana.tareasEstudiante,
      ...empresa.integrantes
        .filter(integrante => 
          !resSemana.tareasEstudiante.some(estudiante => estudiante.idEstudiante === integrante.idEstudiante)
        )
        .map(integrante => ({
          apellido: `${integrante.primerApellido} ${integrante.segundoApellido}`,
          idEstudiante: integrante.idEstudiante,
          nombre: integrante.nombreEstudiante,
          tareas: []
        }))
    ];
    nuevaListaTareasEstudiante.sort((a, b) => a.idEstudiante - b.idEstudiante);
    const newSemana = {
      idSemana: resSemana.idSemana,
      numSemana: resSemana.numSemana,
      tareas: resSemana.tareas,
      tareasEstudiante: nuevaListaTareasEstudiante
    };
    const dataBuena = {
      idSprint: data2.idSprint,
      numSprint: data2.numSprint,
      semana: newSemana
    };

    const mostrar =   comentarios.length>0&&(comentarios?.length === dataBuena.semana?.tareasEstudiante?.length)
    console.log(mostrar)
    setMostrarBotones(mostrar)
    setSprints(dataBuena)
  }, [comentarios, data2, empresa]);
  
  return (
    <Fragment>
      <BaseUI
        titulo="EVALUACION SEMANAL"
        ocultarAtras={false}
        confirmarAtras={false}
        dirBack={`/homeGrupo/${idGrupo}/listaEmpresas/evaluacionSemanal/${idEmpresa}`}
        loading={loading}
        error={{error:error}}
      >
        
            <NombreEmpresa
              nombreCorto={empresa.nombreCorto}
              nombreLargo={empresa.nombreLargo}
            />

            <h2>SPRINT {data2.numSprint} - SEMANA {data2.semana?.numSemana}</h2>
            {data2 !== undefined && comentarios !== undefined && 
              <TablaEvaluacionSemanal sprint={sprints !== null? sprints:[]} comenta={comentarios} showButtons={!mostrarBotones}/>
            } 
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

export default SeguimientoSemanal;