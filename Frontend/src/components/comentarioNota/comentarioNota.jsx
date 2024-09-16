import { Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';

function ComentarioNota({ comentario, nota }) {
  return (
    <Fragment>
      <div className='calificar'>
        <div>
          <h3>Comentario</h3>
          <p 
            className='calificar_inputText' 
            readOnly 
          >
            {comentario}
          </p>
          <div className='notaOrden'>
            <div>
              <label htmlFor="">Nota: </label>
              <p 
                className='calificar_inputNota' 
                readOnly 
              >
                {nota}
              </p>
            </div>
            <Button variant='contained'>Editar</Button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

// Validación de props usando PropTypes
ComentarioNota.propTypes = {
  comentario: PropTypes.string.isRequired, // comentario debe ser string y es requerido
  nota: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]).isRequired, // nota puede ser number o string, pero es requerido
};

export default ComentarioNota;
