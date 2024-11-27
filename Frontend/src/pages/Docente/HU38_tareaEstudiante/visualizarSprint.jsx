import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BaseUI from '../../../components/baseUI/baseUI.jsx';
import { getSprintSemanas } from '../../../api/sprintApi.jsx'; 
import Acordeon from '../../../components/acordeon/acordeon.jsx'
const VisualizarSprintEst = () => {
    const { idSprint, idEmpresa, idGrupo } = useParams(); 
    const [sprints, setSprints] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true); 
    useEffect(() => {
        const fetchSprintData = async () => {
            try {
                const data = await getSprintSemanas(idEmpresa===undefined? idSprint : idEmpresa); 
                console.log([data])
                setSprints([data]);
            } catch (err) {
                console.error('Error en la solicitud:', err);
                setError(true); 
            } finally {
                setLoading(false); 
            }
        };
        
        fetchSprintData();
    }, []); 
    return (
        <BaseUI
            titulo={'SELECCIONE UNA TAREA PARA VISUALIZAR'}
            ocultarAtras={false}
            confirmarAtras={false}
            dirBack={`/homeGrupo/${idGrupo}/empresasVerTareas`}
            loading={loading}
            error={error}
        >        
            <Acordeon
                navigateLink={`/homeGrupo/${idGrupo}/empresaVerTareas/${idEmpresa}/SprintSemanatarea/`}
                bloquearFechas={false}
                verSprints={true}
                sprints={sprints}        
            ></Acordeon>
        </BaseUI>
    );
}

export default VisualizarSprintEst;
