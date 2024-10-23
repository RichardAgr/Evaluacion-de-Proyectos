// import { useEffect} from 'react'; 
// import { useState } from 'react';
import { useParams} from "react-router-dom";
import { Fragment } from 'react';
import { styled } from '@mui/material';
import BaseUI from '../../../components/baseUI/baseUI';
import Comentario from '../../../components/comentarioNota/comentario';
// import SprintSemanas from '../../../components/SprintTareas/sprintSemanas.jsx';

function VisualizarTarea() {
    const { idTarea } = useParams();
    const { idSprint } = useParams();
    return (
        <Fragment>
          <BaseUI
            titulo = {'VIZUALIZAR TAREA'}
            ocultarAtras = {false}
            confirmarAtras = {false}
            dirBack = {`/homeEstudiante/homeGrupoEstudiante/sprint/${idSprint}`}
          >
            <div>
            <div><h1>Realizar {idTarea} Sprint {idSprint} </h1></div>
            <ArchivosSection>
            <h3>Archivos:</h3>
            <ArchivosWrapper>
            <div className="archivos-icons">

            </div>

            </ArchivosWrapper>
            </ArchivosSection>
            <DescripcionTarea>
                <h4>Responsables</h4>
                <Responsables>
                <p>Jhon Corraleas</p>
                <p>Jhon Calicho Garcia</p>

                </Responsables>
            </DescripcionTarea>
            <Comentario>
            </Comentario>
            </div>


          </BaseUI> 
        </Fragment>
      );
    }



export default VisualizarTarea;

const DescripcionTarea = styled('div')`
  margin-top: 1rem;
`;

const ArchivosSection = styled('div')`
  margin-top: 1rem;
`;
const ArchivosWrapper = styled('div')`
  box-sizing: border-box;
  padding: 1rem;
  min-height: 8vw;
  border: 0.4vw dotted black;
  border-radius: 0.1rem;
  width: 40%;
  .archivos-icons {
    display: flex;
    gap: 1rem;
  }
  .archivo-ejemplo {
    width: 50px;
    height: 50px;
  }
`;
const Responsables = styled('div')`
    box-sizing: border-box;
    width: 50%;
    padding: 2.5vw;
    min-height: 15vw;
    width: 40;
    padding-bottom: 5vw;


`