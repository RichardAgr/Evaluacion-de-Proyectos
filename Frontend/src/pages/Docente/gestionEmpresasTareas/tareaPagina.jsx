import CalificarTarea from '../../../components/CalificarTarea/CalificarTarea';
import { useParams } from 'react-router-dom'; 
import BaseUI from '../../../components/baseUI/baseUI'; 

const TareaPage = () => {
  const { idTarea } = useParams(); 

  return (
    <BaseUI
      titulo={'CALIFICAR TAREA'} 
      ocultarAtras={false} 
      confirmarAtras={true} 
      dirBack={'/'}
    >
      <CalificarTarea idTarea={idTarea} /> {/* Pasar idTarea a CalificarTarea */}
    </BaseUI>
  );
};

export default TareaPage;
