import { Fragment } from 'react';
import { Button } from '@mui/material';
import Header from '../../../components/Header/header.jsx';
import Footer from '../../../components/Footer/footer.jsx';
import InfoEmpresa from '../../../components/infoEmpresa/infoEmpresa.jsx'
import TablaNotasPlanificacion from '../../../components/tablaPlanificacionNotas/tablaPlanificacionNotas.jsx';
import TablaPlanificacion from '../../../components/tablaPlanificacion/tablaPlanificacion.jsx';

function PlanificacionDeDesarollo() {
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
              <TablaPlanificacion></TablaPlanificacion>
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