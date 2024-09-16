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
          <Link to={'/homeDocente/homeGrupoEstudiante/planificacion'}>
            <Button variant="contained">Ver Planificacion</Button>
            <Button variant="contained" color='secondary'>Ver Planificacion</Button>
          </Link>
        </div>
      <Footer></Footer>
    </Fragment>
  );
}

export default home;