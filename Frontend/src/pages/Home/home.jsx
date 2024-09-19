import { Fragment } from 'react';
import Footer from '../../components/Footer/footer.jsx'
import Header from '../../components/Header/header.jsx'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function home() {
  return (
    <Fragment>
      <Header></Header>
        <div className='container'>
          <Link to={'/homeEstudiante/homeGrupoEstudiante/verPlanificacion'}>
            <Button variant="contained">Ver Planificacion</Button>
          </Link>          
          <Link to={'/homeEstudiante/homeGrupoEstudiante/editarPlanificacion'}>
            <Button variant="contained" color='secondary'>Editar Planificacion</Button>
          </Link>
          <Link to={'/homeDocente/homeGrupoEstudiante/validarPlanificacion'}>
            <Button variant="contained" color='secondary'>Validar Planificacion</Button>
          </Link>
        </div>
      <Footer></Footer>
    </Fragment>
  );
}

export default home;