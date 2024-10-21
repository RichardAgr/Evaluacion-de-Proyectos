import { Fragment, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getPlanificacionesAceptadas } from "../../api/getPlanificacionesAceptadas";
import { useNavigate } from "react-router-dom";
import Loading from "../loading/loading";
import Error from "../error/error";

function ListaEmpresasVisualizar() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({
    errorMessage: "",
    errorDetails: "",
  });
  const [listaEmpresas, setListaEmpresas] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [lista] = await Promise.all([getPlanificacionesAceptadas()]);
        setListaEmpresas(lista);
        console.log(lista);
      } catch (error) {
        console.error("Error en la solicitud:", error.message);
        setError({
          errorMessage: "Ha ocurrido un error",
          errorDetails: error.message,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleRowClick = (idEmpresa) => {
    navigate(
      `/visualizarPlanificacion/empresa/${idEmpresa}`
    );
  };

  return (
    <>
        {error.errorMessage || error.errorDetails ? (
          <Error
            errorMessage={error.errorMessage}
            errorDetails={error.errorDetails}
          />
        ) : loading ? (
          <Loading />
        ) : (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Nombre Empresa</TableCell>
                  <TableCell align="left">Nombre Largo</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listaEmpresas.map((empresa) => (
                  <TableRow
                    key={empresa.idEmpresa}
                    sx={{
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "#e0e0e0",
                      },
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                    onClick={() => handleRowClick(empresa.idEmpresa)}
                  >
                    <TableCell component="th" scope="row" align="left">
                      {empresa.nombreEmpresa}
                    </TableCell>
                    <TableCell align="left">{empresa.nombreLargo}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          </>
        )}
    </>
  );
}

export default ListaEmpresasVisualizar;
