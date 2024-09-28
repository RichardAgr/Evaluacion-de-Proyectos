
import EmpresaList from "../../../../components/TablesDocente/EmpresasTable.jsx";
import BaseUI from "../../../../components/baseUI/baseUI.jsx";

function EmpresaListPage() {
  return (
    <>
      <BaseUI
        titulo = {'Lista de Grupo Empresas para Validar'}
        ocultarAtras = {false}
        confirmarAtras = {false}
        dirBack = {'/'}
      >
          <EmpresaList />
      </BaseUI>
    </>
  );
}

export default EmpresaListPage;
