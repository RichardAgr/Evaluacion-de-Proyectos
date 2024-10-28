/* eslint-disable react/prop-types */
import BaseUI from '../baseUI/baseUI';
import NombreEmpresa from '../infoEmpresa/nombreEmpresa';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material';

function ListaDefinitiva({ titulo, cabezeraTitulo, cabezeras, datosTabla, ocultarAtras, confirmarAtras, dirBack, dirForward }) {
    const navigate = useNavigate();

    const handleRowClick = (id) => {
        if (dirForward) {
            navigate(`${dirForward}${id}`);
        }
    };

    return (
        <BaseUI        
            titulo={titulo}
            ocultarAtras={ocultarAtras}
            confirmarAtras={confirmarAtras}
            dirBack={dirBack}
        >
            {cabezeraTitulo&&
                <NombreEmpresa nombreCorto={cabezeraTitulo.nombreCorto} nombreLargo={cabezeraTitulo.nombreLargo} />
            }
            <Container>
                <TableContainer component={Paper}>
                    <Table aria-label="dynamic-width-table">
                        <TableHead>
                            <TableRow>
                                {cabezeras.map((cabezera, index) => (
                                    <TableCell align="left" key={index} className='tableRow'>
                                        {cabezera}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {datosTabla.map((datos) => (
                                <TableRow
                                    key={datos.id}
                                    className={`tableRow--body ${dirForward ? 'clickable' : ''}`}
                                    onClick={() => dirForward && handleRowClick(datos.id)}
                                >
                                    {cabezeras.map((cabezera, cellIndex) => (
                                        <TableCell key={cellIndex} align="left" className="tableCell">
                                            {datos[cabezera]}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </BaseUI>
    );
}

export default ListaDefinitiva;

const Container = styled('div')`
    .tableRow {
        padding-top: 2rem;
        padding-bottom: 2rem;
        font-weight: bold;
        white-space: nowrap;
    }
    .tableRow--body {
        cursor: default;
        transition: background-color 0.3s;
        &:hover {
            background-color: #e0e0e0;
        }
    }
    .tableRow--body.clickable {
        cursor: pointer;
        transition: background-color 0.3s;
        &:hover {
            background-color: #e0e0e0;
        }
    }
    .tableCell { 
        white-space: nowrap;
        padding-top: 2rem;
        padding-bottom: 2rem;
    }
`;
