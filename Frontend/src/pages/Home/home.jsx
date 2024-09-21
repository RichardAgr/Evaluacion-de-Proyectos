import { Fragment } from 'react';
import Footer from '../../components/Footer/footer.jsx'
import Header from '../../components/Header/header.jsx'

function home() {
  return (
    <Fragment>
      <Header></Header>
        <div className='container'>
        </div>
      <Footer></Footer>
    </Fragment>
  );
}

export default home;