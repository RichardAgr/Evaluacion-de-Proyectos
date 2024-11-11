import { useParams } from 'react-router-dom';
import VisualizarSprintEst from '../visualizarSprintEstudiante/visualizarSprint';
function ListaTareas() {
    const { idSprint, idEstudiante, idGrupo } = useParams(); 
  return (
    <VisualizarSprintEst 
      titulo={'SELECCIONE UNA TAREA PARA MODIFICAR'} 
      navigateLink={`/${idEstudiante}/homeGrupoE/${idGrupo}/sprintE/${idSprint}/semana/editarTarea/`}
    ></VisualizarSprintEst>
  );
}

export default ListaTareas;