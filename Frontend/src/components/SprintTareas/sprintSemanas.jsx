import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/* eslint-disable react/prop-types */

const SprintSemanas = ({ title, semana, idSprint }) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const togglePanel = () => {
        setIsOpen(!isOpen);
    };

    const clickBoton = (tarea) => {
        console.log("click", tarea)
        navigate(`/homeEstudiante/homeGrupoEstudiante/sprint/${idSprint}/tarea/${tarea.idTarea}`); 
    }

    return (
        <div className="collapse-panel" style={{ marginBottom: '2px' }}>
            {(
                <div className="collapse-header" onClick={togglePanel}>
                    <span style={{ fontSize: '1.5em', marginRight: '10px', textAlign: 'center' }}>{isOpen ? '>' : '>'}</span>
                    <h2 style={{
                        margin: 0,
                        textAlign: 'center', 
                        textTransform: 'uppercase',
                        fontWeight: 100,
                        fontFamily: 'Arial, sans-serif'
                    }}>
                        {title}
                    </h2>
                </div>
            )}
            {isOpen && (
                <div className="collapse-panel" style={{ padding:'1px'}} >
                    {semana.tareas.map((tarea) => (
                        <div className='collapse-child'onClick={() => {clickBoton(tarea)}} key={tarea.idTarea}>
                            <p style={{ fontSize: '25px' }} >{tarea.textoTarea}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SprintSemanas;
