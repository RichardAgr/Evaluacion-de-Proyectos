import { Fragment } from 'react';
import BaseUI from '../../../../components/baseUI/baseUI';

function ModificarTarea() {
  return (
    <Fragment>
      <BaseUI
        titulo={'PLANIFICACION DE DESARROLLO'}
        ocultarAtras={false}
        confirmarAtras={false}
        dirBack={'/'}
      >
        <p>HOLA QUE TAL</p>
      </BaseUI>
    </Fragment>
  );
}

export default ModificarTarea;
