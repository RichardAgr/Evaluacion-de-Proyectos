import { Fragment } from 'react';
import { Button } from '@mui/material';
function buttonBackAndTitle({datosTitleBack}) {
    function goBack() {
        window.history.back();
    }
  return (
    <Fragment>
      {datosTitleBack.ocultarAtras?
        <></>
        :
        <Button variant='contained' onClick={goBack}>
          Atras
        </Button>
      }
      <h1>{datosTitleBack.titulo}</h1>
    </Fragment>
  );
}

export default buttonBackAndTitle;