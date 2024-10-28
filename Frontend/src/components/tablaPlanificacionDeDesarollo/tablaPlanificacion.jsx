import { Fragment, useMemo } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableFooter from '@mui/material/TableFooter';
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Box, Typography } from "@mui/material";
function tablaPlanificacion({ sprints, ocultarBotones }) {
  const totalCharge = useMemo(() => {
    return sprints.reduce((total, sprint) => {
      const charge = parseFloat(sprint.cobro) || 0;
      return total + charge;
    }, 0);
  }, [sprints]);
  return (
    <>
      <Box sx={{ mb: 2 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Hito</TableCell>
                <TableCell align="left">Fecha Inicio</TableCell>
                <TableCell align="left">Fecha Fin</TableCell>
                <TableCell align="left">Fecha Entrega</TableCell>
                <TableCell align="left">Cobro (Bs)</TableCell>
                <TableCell align="left">Entregables</TableCell>
                {ocultarBotones ? <></> : <TableCell align="left"></TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {sprints.map((sprint, index) => {
                const fechaInicioSprint = new Date(sprint.fechaIni);
                return (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {"HITO " + (index + 1)}
                    </TableCell>
                    <TableCell align="left">{sprint.fechaIni}</TableCell>
                    <TableCell align="left">{sprint.fechaFin}</TableCell>
                    <TableCell align="left">{sprint.fechaEntrega}</TableCell>
                    <TableCell align="left">{sprint.cobro}</TableCell>
                    <TableCell align="left">{sprint.entregables}</TableCell>
                    {!ocultarBotones && (
                      <TableCell align="left">
                        {fechaActual >= fechaInicioSprint ? (
                          <Button variant="contained">Ver Sprint</Button>
                        ) : (
                          <></>
                        )}
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={4} align="right">
                  <Typography variant="subtitle1" fontWeight="bold" style={{ color: 'black' }}>
                    Cobro Total:
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="subtitle1" fontWeight="bold" style={{ color: 'black' }}>
                    {totalCharge.toFixed(2)} Bs
                  </Typography>
                </TableCell>
                <TableCell colSpan={ocultarBotones ? 1 : 2} />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default tablaPlanificacion;
