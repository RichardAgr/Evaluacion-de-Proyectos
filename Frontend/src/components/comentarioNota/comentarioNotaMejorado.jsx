/* eslint-disable react/prop-types */
import { Fragment } from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function ComentarioNota({ comentario, nota, linkDir, tituloComentario = 'Comentario', tituloNota = 'Nota' }) {
  return (
    <Fragment>
      <div className='calificar'>
        <div>
          <h3>{tituloComentario}</h3>
          <p className='calificar_inputText' 
            readOnly 
          >
            {comentario ?
              comentario
              :
              'Sin Comentario'
            }
          </p>
          <div className='notaOrden'>
            <div>
              <label htmlFor="">{tituloNota}: </label>
              <p 
                className='calificar_inputNota' 
                readOnly 
              >
                {nota ?
                  nota
                  :
                  'Sin Calificar'
                }
              </p>
            </div>
            {linkDir === 'ocultar' ?
              <></>
              :
              <Link to={linkDir}>
                <Button variant='contained'>Editar</Button>
              </Link>  
            }
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default ComentarioNota;
