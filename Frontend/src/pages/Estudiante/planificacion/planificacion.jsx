import { Fragment, useState } from 'react';
import Footer from '../../../components/Footer/footer.jsx'
import Header from '../../../components/Header/header.jsx'
import ButtonBackAndTitle from '../../../components/buttonBackAndTitle/buttonBackAndTitle.jsx';
import ComentarioNota from '../../../components/comentarioNota/comentarioNota.jsx';
import { useLocation } from 'react-router-dom';
import VistaTablaPlanificacion from '../../../components/vistaTablaPlanificacion/vistaTablaPlanificacion.jsx';
import { Button } from '@mui/material';
import EditarPlanificacion from '../../../components/editarTablaPlanificacion/editarTablaPlanificacion.jsx';
function Planificacion() {
  let data = useLocation();
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
  return (
    <Fragment>
      <Header></Header>
        <div className='box'>
            <div className='container'>
              <ButtonBackAndTitle datosTitleBack={datosTitleBack}></ButtonBackAndTitle>
              <div className='pageBorder'>
              <div className='pageBorder_interior'>
                {change?
                  <EditarPlanificacion sprints={data.state.sprints} changeTable={changeTable}></EditarPlanificacion>
                  :
                  <>
                    <VistaTablaPlanificacion sprints={data.state.sprints}></VistaTablaPlanificacion>        
                    <Button variant='contained'onClick={changeTable}>Editar</Button>
                  </>
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
