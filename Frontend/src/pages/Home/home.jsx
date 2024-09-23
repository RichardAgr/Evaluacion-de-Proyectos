import { Fragment } from 'react';
import Footer from '../../components/Footer/footer.jsx'
import Header from '../../components/Header/header.jsx'

function home() {
  return (
    <Fragment>
    <Header></Header>
      <div className='box'>
        <div className='container'>
          <div className='pageBorder'>
            <div className='pageBorder_interior'>
            
            </div>
          </div>
        </div>
      </div>
    <Footer></Footer>
    </Fragment>
  );
}

export default home;