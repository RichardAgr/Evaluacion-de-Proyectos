import React from "react";
import { Box, Container } from "@mui/material";
import EmpresaList from "../../../components/TablesDocente/EmpresasTable.jsx";

import BackButtonAndTitle from "../../../components/Buttons/BackButtonAndTitle.jsx";
import Header from "../../../components/Header/header.jsx";
import Footer from "../../../components/Footer/footer.jsx";

function EmpresaListPage() {
  return (
    <>
      <Header />
      <Box className="box">
        <Box className="container">
          <BackButtonAndTitle title="Lista de Grupo Empresas" />
          <EmpresaList />
        </Box>
      </Box>
      <Footer />
    </>
  );
}

export default EmpresaListPage;
