/* eslint-disable react/prop-types */
import { Fragment } from 'react';
import ButtonBackAndTitle from '../buttonBackAndTitle/buttonBackAndTitle.jsx';
import Header from '../Header/header.jsx';
import Footer from '../Footer/footer.jsx';

function BaseUI({ children, titulo, ocultarAtras, confirmacionAtras, dirBack }) {
  return (
    <Fragment>
      <Header />
      <div className='box'>
        <div className='container'>
          <ButtonBackAndTitle
            titulo={titulo}
            ocultarAtras={ocultarAtras}
            confirmacionAtras={confirmacionAtras}
            dirBack={dirBack}
          />
          <div className='pageBorder'>
            <div className='pageBorder_interior'>
              {children}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
}

export default BaseUI;
