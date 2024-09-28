import { Fragment, useState, useEffect } from 'react';
import Footer from '../../../components/Footer/footer.jsx'
import Header from '../../../components/Header/header.jsx'
import ButtonBackAndTitle from '../../../components/buttonBackAndTitle/buttonBackAndTitle.jsx';
import ComentarioNota from '../../../components/comentarioNota/comentarioNota.jsx';
import { useParams } from 'react-router-dom';
import EditarPlanificacion from '../../../components/editarTablaPlanificacion/editarTablaPlanificacion.jsx';
import { getPlanificacion } from '../../../api/getPlanificacion.jsx';
import { getNombreEmpresa } from '../../../api/getNombreEmpresa.jsx';
import NombreEmpresa from '../../../components/infoEmpresa/nombreEmpresa.jsx'
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
      <Header></Header>
        <div className='box'>
            <div className='container'>
              <ButtonBackAndTitle 
                titulo = {'MODIFICANDO PLANIFICACION'}
                ocultarAtras = {false}
                confirmarAtras = {true}
                dirBack = {'/'}
              ></ButtonBackAndTitle>
              <div className='pageBorder'>
              <div className='pageBorder_interior'>
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
                </div>
              </div>
            </div>
        </div>  
      <Footer></Footer>
    </Fragment>
  );
}

export default Planificacion;