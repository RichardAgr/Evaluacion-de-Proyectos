import { Fragment, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getPlanificacionesAceptadas } from "../../../../api/getPlanificacionesAceptadas";
import { useNavigate } from "react-router-dom";
import BaseUI from "../../../../components/baseUI/baseUI";
import Loading from "../../../../components/loading/loading";
import Error from "../../../../components/error/error";
import ListaEmpresasVisualizar from "../../../../components/listas/listaEmpresasVisualizar";
function SeleccionarEmpresaVisualizar() {
  return (
    <>
      <BaseUI
        titulo={"SELECCIONE UNA PLANIFICACION PARA VISUALIZAR"}
        ocultarAtras={false}
        confirmarAtras={false}
        dirBack={"/"}
      >
        <ListaEmpresasVisualizar/>
      </BaseUI>
    </>
  );
}

export default SeleccionarEmpresaVisualizar;
