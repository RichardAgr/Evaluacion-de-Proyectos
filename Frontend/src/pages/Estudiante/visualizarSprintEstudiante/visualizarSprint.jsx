import { Fragment, useEffect} from 'react'; 
import { useState } from 'react';
import { useParams} from "react-router-dom";
import BaseUI from '../../../components/baseUI/baseUI';
import ComentarioNota from '../../../components/comentarioNota/comentarioNotaMejorado.jsx';
import SprintSemanas from '../../../components/SprintTareas/sprintSemanas.jsx';
import { getSprintSemanas } from '../../../api/sprintApi.jsx'; 

function VisualizarSprintEst() {
    const { idSprint } = useParams();
    const [sprintData, setSprintData] = useState(null); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchSprintData = async () => {
            try {
                console.log(idSprint); 
                const data = await getSprintSemanas(idSprint);
                console.log('Datos recibidos:', data); // Log para ver los datos en consola
                setSprintData(data); 
            } catch (err) {
                console.error('Error en la solicitud:', err); // Log para errores
                setError(err.message); 
            } finally {
                setLoading(false); 
            }
        };

        fetchSprintData(); 
    }, [idSprint]);

    if (loading) return <p>Cargando...</p>; 
    if (error) return <p>Error: {error}</p>; 

    return (
        <Fragment>
        <BaseUI
            titulo={`VISUALIZAR SPRINT ${idSprint}`}
            ocultarAtras={false}
            confirmarAtras={false}
            
            dirBack={'/'}
        >
            <div className='visualizarSprint'>
                <div>
                    { sprintData && (
                        <>
                            {sprintData.semanas.map((semana) => (
                                // Solo renderizar si hay tareas
                                semana.tareas.length > 0 && (
                                    <SprintSemanas key={semana.idSemana} title={`Semana ${semana.idSemana}`}>
                                        {semana.tareas.map((tarea) => (
                                            <div key={tarea.idTarea} className="collapse-child">
                                                {tarea.textoTarea}
                                            </div>
                                        ))}
                                    </SprintSemanas>
                                )
                            ))}
                        </>
                    )}
                    <ComentarioNota
                        comentario={sprintData.comentario}
                        nota={sprintData.ComentarioNota}
                        tituloComentario={`Comentario Docente SPRINT  ${idSprint}`}
                        tituloNota={"Nota Sprint "}
                        linkDir={"ocultar"}
                    />
                </div>

            </div>
        



        </BaseUI>
        </Fragment>
    );
}

export default VisualizarSprintEst;
