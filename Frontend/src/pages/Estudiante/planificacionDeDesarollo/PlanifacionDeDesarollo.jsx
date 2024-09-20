
import { Fragment, useEffect } from 'react';
import { useState } from 'react';
import { useParams,Link } from "react-router-dom";
import { Button } from '@mui/material';
import Header from '../../../components/Header/header.jsx';
import Footer from '../../../components/Footer/footer.jsx';
import InfoEmpresa from '../../../components/infoEmpresa/infoEmpresa.jsx'
import TablaNotasPlanificacion from '../../../components/tablaPlanificacionNotas/tablaPlanificacionNotas.jsx';
import TablaPlanificacion from '../../../components/tablaPlanificacionDeDesarollo/tablaPlanificacion.jsx';
import { getEmpresaData } from '../../../endPoints/getEmpresa.jsx';
import { getPlanificacion} from '../../../endPoints/getPlanificacion.jsx'
function PlanificacionDeDesarollo() {
  
  const [empresaData, setEmpresaData] = useState(null);
  let { idEmpresa } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sprints, setSprints] = useState(null);
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
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [idEmpresa])
  useEffect(() => {
    setSprints(planificacionData.sprints);
  }, [planificacionData])
  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <Fragment>
      <Header></Header>
      <div className='box'>
        <div className='container'>
          <Button variant='contained' >Atras</Button>
          <h1>PLANIFICACION DE DESAROLLO</h1>
          <div className='pageBorder'>
            <div className='pageBorder_interior'>
              <InfoEmpresa nombreLargo= {empresaData.nombreLargo} nombreCorto = {empresaData.nombreEmpresa} integrantes={empresaData.integrantes}></InfoEmpresa>
              {!planificacionData.aceptada?
                <div className='divContainerPlani'>
                    <Link
                      to={`/homeEstudiante/homeGrupoEstudiante/Empresa/planificacion`}
                      state={{
                        sprints
                      }}
                    >
                    <Button variant="contained">Crear Planificación</Button>
                  </Link>
                </div>
              :
              (
                <div>
                  <Link>
                    <Button variant="contained" color="secondary">Ver Antigua Planificacion</Button>
                  </Link>
                  <TablaPlanificacion sprints = {planificacionData.sprints}></TablaPlanificacion>
                </div>
              )
              }
              <TablaNotasPlanificacion ></TablaNotasPlanificacion>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </Fragment>
  );
}

export default PlanificacionDeDesarollo;