import { useState, useEffect } from 'react';
import BaseUI from '../../../components/baseUI/baseUI.jsx';
import { getSprintSemanas } from '../../../api/sprintApi.jsx'; 
import Acordeon from '../../../components/acordeon/acordeon.jsx'
const VisualizarSprintEst = () => {
    const idEmpresa = localStorage.getItem("idEmpresa")
    const idEstudiante = localStorage.getItem("idEstudiante")
    const [sprints, setSprints] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true); 
    useEffect(() => {
        const fetchSprintData = async () => {
            try {
                const data = await getSprintSemanas(idEmpresa); 
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
            dirBack={idEstudiante===null?`/homeDocente/listaEmpresasVerTareas`:'/homeEstu'}
            loading={loading}
            error={error}
        >        
            <Acordeon
                navigateLink={idEstudiante===null?`/homeDocente/listaEmpresasVerTareas/sprints/tarea`:'/homeEstu/listaSprintsSemanasTareas/verTarea'}
                bloquearFechas={false}
                verSprints={true}
                sprints={sprints}        
            ></Acordeon>
        </BaseUI>
    );
}

export default VisualizarSprintEst;
