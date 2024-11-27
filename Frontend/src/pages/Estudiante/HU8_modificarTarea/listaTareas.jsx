import { getSprintSemanasTareas } from "../../../api/getEmpresa";
import BaseUI from '../../../components/baseUI/baseUI';
import { useState, useEffect } from 'react';
import Acordeon from '../../../components/acordeon/acordeon'
function ListaTareas() {
    const idEmpresa = localStorage.getItem("idEmpresa")
    const [sprints, setSprints] = useState([]);
    const [error, setError] = useState({error:false});
    const [loading, setLoading] = useState(true); 
    useEffect(() => {
      const fetchSprints = async () => {
        try {
          const data = await getSprintSemanasTareas(idEmpresa);
          const dateNow = new Date()
          console.log(data)
          const sprintActual = data.filter((sprint) => 
            new Date(sprint.fechaIni) <= new Date(normalizeDate(dateNow)) && new Date(normalizeDate(dateNow)) <= new Date(sprint.fechaFin)
          );
          console.log(sprintActual)
          const semanaActual = sprintActual[0]?.semanas.filter((semana) => {
              const a = new Date(semana.fechaIni) <= new Date(normalizeDate(dateNow)) && new Date(normalizeDate(dateNow)) <= new Date(semana.fechaFin);
              console.log(new Date(semana.fechaIni) +"<="+ new Date(normalizeDate(dateNow)) +""+ new Date(normalizeDate(dateNow)) +"<="+ new Date(semana.fechaFin))
            return a}
          ) || [];
          console.log(semanaActual);
          const sprintNew = [{...sprintActual[0], semanas: semanaActual }];
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
        dirBack={'/homeEstu'}
        loading={loading}
        error={error}
    >
      <Acordeon
        navigateLink={`/homeEstu/listaTareas/modificarTarea`}
        bloquearFechas={false}
        verSprints={false}
        sprints={sprints}        
      ></Acordeon>
    </BaseUI>
  );
}

export default ListaTareas;