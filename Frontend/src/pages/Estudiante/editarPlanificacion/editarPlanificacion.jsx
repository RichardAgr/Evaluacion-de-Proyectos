import { Fragment, useState, useEffect } from 'react';
import Footer from '../../../components/Footer/footer.jsx'
import Header from '../../../components/Header/header.jsx'
import ButtonBackAndTitle from '../../../components/buttonBackAndTitle/buttonBackAndTitle.jsx';
import ComentarioNota from '../../../components/comentarioNota/comentarioNota.jsx';
import { useParams } from 'react-router-dom';
import VistaTablaPlanificacion from '../../../components/vistaTablaPlanificacion/vistaTablaPlanificacion.jsx';
import { Button } from '@mui/material';
import EditarPlanificacion from '../../../components/editarTablaPlanificacion/editarTablaPlanificacion.jsx';
import InfoEmpresa from '../../../components/infoEmpresa/infoEmpresa.jsx';
import { getEmpresaData } from '../../../api/getEmpresa.jsx';
import { getPlanificacion} from '../../../api/getPlanificacion.jsx';
function Planificacion() {
  let [change, setChange] = useState(false);
  const [datosTitleBack, setDatosTitleBack] = useState(
    {
      titulo: 'Planificacion',
      ocultarAtras: false
    }
  );
  function changeTable(){
    setChange(!change)
    if(!datosTitleBack.ocultarAtras){
      setDatosTitleBack(
        {
          titulo: 'Editando Planificacion',
          ocultarAtras: true
        } 
      );
    }else{
      setDatosTitleBack(
        {
          titulo: 'Planificacion',
          ocultarAtras: false
        } 
      );
    }
  }
  
  
  const [empresaData, setEmpresaData] = useState(null);
  let { idEmpresa } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [planificacionData, setPlanificacionData] = useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [empresa, planificacion] = await Promise.all([
          getEmpresaData(idEmpresa),
          getPlanificacion(idEmpresa),
        ]);
        setEmpresaData(empresa);
        setPlanificacionData(planificacion);
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
              <ButtonBackAndTitle datosTitleBack={datosTitleBack}></ButtonBackAndTitle>
              <div className='pageBorder'>
              <div className='pageBorder_interior'>
                <InfoEmpresa nombreLargo= {empresaData.nombreLargo} nombreCorto = {empresaData.nombreEmpresa} integrantes={empresaData.integrantes}></InfoEmpresa>
                {planificacionData != null?
                  <>
                    {change?
                      <EditarPlanificacion 
                        sprints={planificacionData.sprints} 
                        changeTable={changeTable}
                        idPlanificacion={planificacionData.idPlanificacion}
                        idEmpresa={planificacionData.idEmpresa}
                      ></EditarPlanificacion>
                      :
                      <>
                        <VistaTablaPlanificacion sprints={planificacionData.sprints}></VistaTablaPlanificacion>        
                        {planificacionData.aceptada?
                          <></>
                          :
                          <Button variant='contained'onClick={changeTable}>Editar</Button>
                        }
                      </>
                    }
                    <ComentarioNota 
                      comentario={planificacionData.comentarioDocente} 
                      nota = {planificacionData.notaPlanificacion} 
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