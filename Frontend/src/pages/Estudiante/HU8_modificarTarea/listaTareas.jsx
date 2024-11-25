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
          console.log(data);
          const sprintActual = data.filter((sprint) => 
            sprint.fechaIni <= normalizeDate(dateNow) && normalizeDate(dateNow) <= sprint.fechaFin
          );
          const semanaActual = sprintActual[0]?.semanas.filter((semana) => 
              semana.fechaIni <= normalizeDate(dateNow) && normalizeDate(dateNow) <= semana.fechaFin
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
      const array = (date.toLocaleDateString()).split('/')
      const formatoDate =  ""+array[2]+"-"+array[1]+"-"+array[0]
      return formatoDate;
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