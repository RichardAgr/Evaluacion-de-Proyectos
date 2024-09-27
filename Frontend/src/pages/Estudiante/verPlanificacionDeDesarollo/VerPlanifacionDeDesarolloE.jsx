
import { Fragment, useEffect } from 'react';
import { useState } from 'react';
import { useParams} from "react-router-dom";
import Header from '../../../components/Header/header.jsx';
import Footer from '../../../components/Footer/footer.jsx';
import InfoEmpresa from '../../../components/infoEmpresa/infoEmpresa.jsx'
import TablaNotasPlanificacion from '../../../components/tablaPlanificacionNotas/tablaPlanificacionNotas.jsx';
import TablaPlanificacion from '../../../components/tablaPlanificacionDeDesarollo/tablaPlanificacion.jsx';
import { getEmpresaData } from '../../../api/getEmpresa.jsx';
import { getPlanificacion} from '../../../api/getPlanificacion.jsx'
import ButtonBackAndTitle from '../../../components/buttonBackAndTitle/buttonBackAndTitle.jsx';
function PlanificacionDeDesarollo() {
  
  const [empresaData, setEmpresaData] = useState(null);
  let { idEmpresa } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [planificacionData, setPlanificacionData] = useState({aceptada:false})

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
      }finally {
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
            datosTitleBack={{ocultarAtras: false, titulo: 'PLANIFICACION DE DESAROLLO'}}
          >
          </ButtonBackAndTitle>
          <div className='pageBorder'>
            <div className='pageBorder_interior'>
              <InfoEmpresa nombreLargo= {empresaData.nombreLargo} nombreCorto = {empresaData.nombreEmpresa} integrantes={empresaData.integrantes}></InfoEmpresa>
              {!planificacionData.aceptada?
                <div className='divContainerPlani'>
                  <h1>TODAVIA NO SE FUE ACEPTADA</h1>
                </div>
              :
                  <TablaPlanificacion sprints = {planificacionData.sprints} ocultarBotones = {true}></TablaPlanificacion>
              }
              <TablaNotasPlanificacion 
                numeroDeFaltas={empresaData.numeroDeFaltas} 
                sprints={planificacionData.sprints}
                notaProductoFinal= {empresaData.notaProductoFinal}
              ></TablaNotasPlanificacion>
            </div>
            </div>
        </div>
      </div>
      <Footer></Footer>
    </Fragment>
  );
}

export default PlanificacionDeDesarollo;