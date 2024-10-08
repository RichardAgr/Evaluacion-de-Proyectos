// import { useEffect} from 'react'; 
// import { useState } from 'react';
// import { useParams} from "react-router-dom";
import BaseUI from '../../../components/baseUI/baseUI';
import ComentarioNota from '../../../components/comentarioNota/comentarioNotaMejorado';
// import SprintSemanas from '../../../components/SprintTareas/sprintSemanas.jsx';

function VisualizarTarea() {
    // const { idTarea } = useParams();


    return (
        <BaseUI
            titulo={`VISUALIZAR TAREA`}
            ocultarAtras={false}
            confirmarAtras={false}
            dirBack={'/'}
        >
        <ComentarioNota
            linkDir={"ocultar"}
            tituloComentario={"Comentario del Docente"}
            tituloNota={"Nota Sprint "}
        >
        </ComentarioNota>
        



        </BaseUI>


    );





}


export default VisualizarTarea;