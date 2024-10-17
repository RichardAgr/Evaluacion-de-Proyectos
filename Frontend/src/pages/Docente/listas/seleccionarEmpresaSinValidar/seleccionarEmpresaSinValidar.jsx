
import EmpresaList from "../../../../components/tablesDocente/EmpresasTable.jsx";
import BaseUI from "../../../../components/baseUI/baseUI.jsx";
import ListaEmpresasSinValidar from "../../../../components/listas/listaEmpresasSinValidar.jsx";
function SeleccionarEmpresaSinValidar() {
  return (
    <>
      <BaseUI
        titulo = {'SELECCIONE UNA EMPRESA PARA VALIDAR'}
        ocultarAtras = {false}
        confirmarAtras = {false}
        dirBack = {'/'}
      >
          <ListaEmpresasSinValidar />
      </BaseUI>
    </>
  );
}

export default SeleccionarEmpresaSinValidar;
