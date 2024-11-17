import { useParams } from 'react-router-dom';
import { getSprintSemanasTareas } from "../../../api/getEmpresa";
import BaseUI from '../../../components/baseUI/baseUI';
import { useState, useEffect } from 'react';
import Acordeon from '../../../components/acordeon/acordeon'
function ListaTareas() {
    const { idEmpresa, idGrupo, idEstudiante } = useParams(); 
    const [sprints, setSprints] = useState([]);
    const [error, setError] = useState({error:false});
    const [loading, setLoading] = useState(true); 
    useEffect(() => {
      const fetchSprints = async () => {
        try {
          const data = await getSprintSemanasTareas(idEmpresa);
          const dateNow = new Date()
          const sprintActual = data.filter((sprint) => 
            normalizeDate(sprint.fechaIni) <= normalizeDate(dateNow) && normalizeDate(dateNow) <= normalizeDate(sprint.fechaFin)
          );
          const semanaActual = sprintActual[0]?.semanas.filter((semana) => 
              normalizeDate(semana.fechaIni) <= normalizeDate(dateNow) && normalizeDate(dateNow) <= normalizeDate(semana.fechaFin)
          ) || [];
          console.log(semanaActual);
          const sprintNew = [{...sprintActual[0], semanas: semanaActual }];
          console.log(sprintNew)
          setSprints(sprintNew);  
        } catch (error) {
          setError({error:true})
          console.error("Error al obtener los datos:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchSprints();
    }, []); 
    function normalizeDate(date) {
      const d = new Date(date);
      return new Date(d.getFullYear(), d.getMonth(), d.getDate()); // Normaliza la fecha a 00:00:00
    }
  return (
    <BaseUI
        titulo={'SELECCIONE UNA TAREA PARA MODIFICAR'}
        ocultarAtras={false}
        confirmarAtras={false}
        dirBack={'/'}
        loading={loading}
        error={error}
    >
      <Acordeon
        navigateLink={`/${idEstudiante}/homeGrupoE/${idGrupo}/Empresa/${idEmpresa}/sprintSemanaEditarTarea/`}
        bloquearFechas={false}
        verSprints={false}
        sprints={sprints}        
      ></Acordeon>
    </BaseUI>
  );
}

export default ListaTareas;