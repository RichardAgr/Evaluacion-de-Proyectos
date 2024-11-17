import { useParams } from 'react-router-dom';
import { getSemanaActualTareas } from "../../../api/getEmpresa";
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
          const data = await getSemanaActualTareas(idEmpresa);
          console.log(data)
          setSprints(data);  
        } catch (error) {
          setError({error:true})
          console.error("Error al obtener los datos:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchSprints();
    }, []); 
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