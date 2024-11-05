import { useParams } from 'react-router-dom';
import VisualizarSprintEst from '../visualizarSprintEstudiante/visualizarSprint';
function ListaTareas() {
    const { idSprint } = useParams(); 
  return (
    <VisualizarSprintEst 
      titulo={'SELECCIONE UNA TAREA PARA MODIFICAR'} 
      navigateLink={`/homeEstudiante/homeGrupoEstudiante/sprintE/${idSprint}/semana/editarTarea/`}
    ></VisualizarSprintEst>
  );
}

export default ListaTareas;