import { Fragment, useEffect } from 'react';
import { useState } from 'react';
import { useParams } from "react-router-dom";
import { Button } from '@mui/material';
import Header from '../../../components/Header/header.jsx';
import Footer from '../../../components/Footer/footer.jsx';
import InfoEmpresa from '../../../components/infoEmpresa/infoEmpresa.jsx'
import TablaNotasPlanificacion from '../../../components/tablaPlanificacionNotas/tablaPlanificacionNotas.jsx';
import TablaPlanificacion from '../../../components/tablaPlanificacion/tablaPlanificacion.jsx';
import { getEmpresaData } from '../../../endPoints/getEmpresa.jsx';

function PlanificacionDeDesarollo() {
  const [tienePlani] = useState(false);
  const [empresaData, setEmpresaData] = useState(null);
  let { idEmpresa } = useParams();

  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    console.log(idEmpresa)
    const fetchData = async () => {
      try {
        const data = await getEmpresaData(idEmpresa);
        setEmpresaData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error en la solicitud:', error.message);
        setError(`Error en la solicitud: ${error.message}`);
        setLoading(false);
      }
    };
    console.log(empresaData)
    fetchData();
  }, [idEmpresa]);

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
              <InfoEmpresa></InfoEmpresa>
              {!tienePlani?
                <div className='divContainerPlani'>
                  <Button variant='contained'>Crear Planificacion</Button>
                </div>
              :
              (
                <TablaPlanificacion></TablaPlanificacion>
              )
              }
              <TablaNotasPlanificacion></TablaNotasPlanificacion>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </Fragment>
  );
}

export default PlanificacionDeDesarollo;