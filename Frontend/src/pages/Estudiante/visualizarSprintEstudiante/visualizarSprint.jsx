import { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BaseUI from '../../../components/baseUI/baseUI';
import { getSprintSemanas } from '../../../api/sprintApi.jsx'; 
import SprintSemanas from '../../../components/SprintTareas/sprintSemanas';

const VisualizarSprintEst = () => {
    const { idSprint } = useParams(); 
    // const navigate = useNavigate();
    const [semanas, setSemanas] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); 

        // const handleChildClick = (tareaId) => {
        //     navigate(`/homeEstudiante/homeGrupoEstudiante/sprint/${idSprint}/tarea/${tareaId}`); 
        // };
    useEffect(() => {
        const fetchSprintData = async () => {
            try {
                const data = await getSprintSemanas(idSprint); 
                setSemanas(data.semanas); 
                setError(null); 
            } catch (err) {
                console.error('Error en la solicitud:', err);
                setError(err.message); 
            } finally {
                setLoading(false); 
            }
        };

        fetchSprintData(); 
    }, [idSprint]); 


    return (
        <Fragment>
            <BaseUI
                titulo={'VISUALIZAR HITO'}
                ocultarAtras={false}
                confirmarAtras={false}
                dirBack={'/'}
            >
                <div>
                    <h1 style={{ fontSize: '2rem', display: 'flex', overflow: 'hidden', marginBottom: '0.6rem' }}>
                        HITO {idSprint}
                    </h1>
                </div>
                {loading && <p>Cargando semanas...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {semanas.map((semana, index) => (
                    <SprintSemanas key={index} title={`Semana ${index + 1}`} semana={semana} idSprint={idSprint}>
                    </SprintSemanas>
                ))}
            </BaseUI>
        </Fragment>
    );
}

export default VisualizarSprintEst;
