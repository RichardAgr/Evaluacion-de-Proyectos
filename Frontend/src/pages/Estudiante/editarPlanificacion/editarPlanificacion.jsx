import { Fragment, useState, useEffect } from 'react';
import ComentarioNota from '../../../components/comentarioNota/comentarioNota.jsx';
import { useParams } from 'react-router-dom';
import EditarPlanificacion from '../../../components/editarTablaPlanificacion/editarTablaPlanificacion.jsx';
import { getPlanificacion } from '../../../api/getPlanificacion.jsx';
import { getNombreEmpresa } from '../../../api/getNombreEmpresa.jsx';
import NombreEmpresa from '../../../components/infoEmpresa/nombreEmpresa.jsx'
import BaseUI from '../../../components/baseUI/baseUI.jsx';
function Planificacion() {
  
  let { idEmpresa } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [planificacionData, setPlanificacionData] = useState()
  const [datosEmpresa, setDatosEmpresa]= useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [planificacion,nombreEmpresa] = await Promise.all([
          getPlanificacion(idEmpresa),
          getNombreEmpresa(idEmpresa),
        ]);
        setPlanificacionData(planificacion);
        setDatosEmpresa(nombreEmpresa);
        
      } catch (error) {
        console.error('Error en la solicitud:', error.message);
        setError(`Error en la solicitud: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [idEmpresa])
  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <Fragment>
    <BaseUI
      titulo = {'MODIFICANDO PLANIFICACION'}
      ocultarAtras = {false}
      confirmarAtras = {true}
      dirBack = {'/'}
    >
      <NombreEmpresa nombreLargo={datosEmpresa.nombreLargo} nombreCorto={datosEmpresa.nombreEmpresa}></NombreEmpresa>
      {planificacionData != null?
        <>
            <EditarPlanificacion 
              planificacionData={planificacionData} 
              idEmpresa={planificacionData.idEmpresa}
            ></EditarPlanificacion>
          <ComentarioNota 
            comentario={planificacionData.comentarioDocente || 'Sin Comentario Docente'} 
            nota = {planificacionData.notaPlanificacion || 'Sin Calificar'} 
            linkDir={ 'ocultar' }
          ></ComentarioNota>
          </>
        :
        <h1>CARGANDO...</h1>
      }
    </BaseUI>
    </Fragment>
  );
}

export default Planificacion;