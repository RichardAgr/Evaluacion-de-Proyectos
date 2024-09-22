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
import { getEmpresaData } from '../../../endPoints/getEmpresa.jsx';
import { getPlanificacion} from '../../../endPoints/getPlanificacion.jsx';
function Planificacion() {
  let [change, setChange] = useState(false);
  const [datosTitleBack, setDatosTitleBack] = useState(
    {
      titulo: 'Planificacion',
      ocultarAtras: false
    }
  );
  const comentario = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis dolore doloribus iusto suscipit reiciendis autem libero quae, voluptates, iste dignissimos, nihil quos architecto. At sapiente deleniti, molestias assumenda omnis hic!';
  const nota = 50;
  
  function changeTable(){
    setChange(!change)
    if(!datosTitleBack.ocultarAtras){
      setDatosTitleBack(
        {
          titulo: 'Editando Planificacion',
          ocultarAtras: true
        } 
      );
      console.log('true')
    }else{
      setDatosTitleBack(
        {
          titulo: 'Planificacion',
          ocultarAtras: false
        } 
      );
      console.log('false')
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
                  (change?
                    <EditarPlanificacion sprints={planificacionData.sprints} changeTable={changeTable}></EditarPlanificacion>
                    :
                    <>
                      <VistaTablaPlanificacion sprints={planificacionData.sprints}></VistaTablaPlanificacion>        
                      {planificacionData.aceptada?
                        <></>
                        :
                        <Button variant='contained'onClick={changeTable}>Editar</Button>
                      }
                    </>
                  )
                  :
                  <h1>CARGANDO...</h1>
                }
                  <ComentarioNota comentario={comentario} nota = {nota} linkDir={ 'ocultar' }></ComentarioNota>
                </div>
              </div>
            </div>
        </div>  
      <Footer></Footer>
    </Fragment>
  );
}

export default Planificacion;