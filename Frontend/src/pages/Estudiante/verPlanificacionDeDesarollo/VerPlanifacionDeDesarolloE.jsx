<<<<<<< HEAD
import { Fragment, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
=======


import { Fragment, useEffect } from 'react';
import { useState } from 'react';
import { useParams} from "react-router-dom";
>>>>>>> c615931500e8fc26170b99855f789c17902a168d
import Header from '../../../components/Header/header.jsx';
import Footer from '../../../components/Footer/footer.jsx';
import InfoEmpresa from '../../../components/infoEmpresa/infoEmpresa.jsx';
import TablaNotasPlanificacion from '../../../components/tablaPlanificacionNotas/tablaPlanificacionNotas.jsx';
import TablaPlanificacion from '../../../components/tablaPlanificacionDeDesarollo/tablaPlanificacion.jsx';
import { getEmpresaData } from '../../../api/getEmpresa.jsx';
import { getPlanificacion } from '../../../api/getPlanificacion.jsx';
import ButtonBackAndTitle from '../../../components/buttonBackAndTitle/buttonBackAndTitle.jsx';

function PlanificacionDeDesarollo() {
<<<<<<< HEAD
=======
  
  
>>>>>>> c615931500e8fc26170b99855f789c17902a168d
  const [empresaData, setEmpresaData] = useState(null);
  const [planificacionData, setPlanificacionData] = useState({ aceptada: false });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  let { idEmpresa } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [empresa, planificacion] = await Promise.all([
          getEmpresaData(idEmpresa),
          getPlanificacion(idEmpresa),
        ]);
        setEmpresaData(empresa);
        setPlanificacionData(planificacion);
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
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [idEmpresa]);

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!empresaData) return <p>No se encontraron datos de la empresa.</p>;

  return (
    <Fragment>
      <Header />
      <div className='box'>
        <div className='container'>
          <ButtonBackAndTitle 
            datosTitleBack={{ocultarAtras: false, titulo: 'PLANIFICACION DE DESAROLLO'}}
          />
          <div className='pageBorder'>
            <div className='pageBorder_interior'>
<<<<<<< HEAD
              <InfoEmpresa 
                nombreLargo={empresaData.nombreLargo} 
                nombreCorto={empresaData.nombreEmpresa} 
                integrantes={empresaData.integrantes}
              />
              {!planificacionData.aceptada ? (
=======
              <InfoEmpresa nombreLargo= {empresaData.nombreLargo} nombreCorto = {empresaData.nombreEmpresa} integrantes={empresaData.integrantes}></InfoEmpresa>
              {!planificacionData.aceptada?
              <InfoEmpresa nombreLargo= {empresaData.nombreLargo} nombreCorto = {empresaData.nombreEmpresa} integrantes={empresaData.integrantes}></InfoEmpresa>
              {!planificacionData.aceptada?
>>>>>>> c615931500e8fc26170b99855f789c17902a168d
                <div className='divContainerPlani'>
                  <h1>TODAVIA NO FUE ACEPTADA</h1>
                </div>
              ) : (
                <TablaPlanificacion sprints={planificacionData.sprints} />
              )}
              <TablaNotasPlanificacion 
                numeroDeFaltas={empresaData.numeroDeFaltas} 
                sprints={planificacionData.sprints}
                notaProductoFinal={empresaData.notaProductoFinal}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
}

export default PlanificacionDeDesarollo;