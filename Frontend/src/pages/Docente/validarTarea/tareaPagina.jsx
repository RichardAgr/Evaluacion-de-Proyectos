import Header from '../../../components/Header/header'; 
import Footer from '../../../components/Footer/footer';
import CalificarTarea from '../../../components/CalificarTarea/CalificarTarea';
import { useParams } from 'react-router-dom'; // Importar useParams

const TareaPage = () => {
  const { idTarea } = useParams(); // Extraer idTarea de la URL

  return (
    <>
      <Header />
      <div className="page-content">
        <CalificarTarea idTarea={idTarea} /> {/* Pasar idTarea a CalificarTarea */}
      </div>
      <Footer />
    </>
  );
};

export default TareaPage;
