
import BaseUI from "../../../../components/baseUI/baseUI.jsx";
import ListaEmpresasModificar from "../../../../components/listas/listaEmpresasModificar.jsx";
function SeleccionarEmpresaModificar() {
  return (
    <>
      <BaseUI
        titulo = {'SELECCIONE UNA PLANIFICACION PARA MODIFICAR'}
        ocultarAtras = {false}
        confirmarAtras = {false}
        dirBack = {'/'}
      >
          <ListaEmpresasModificar />
      </BaseUI>
    </>
  );
}

export default SeleccionarEmpresaModificar;
