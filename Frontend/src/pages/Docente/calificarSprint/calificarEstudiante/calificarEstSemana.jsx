import { Fragment } from "react";
import BaseUI from "../../../../components/baseUI/baseUI";
import { styled } from "@mui/material";

function CalificarEstSemana() {
    // Nombres de la empresa
    const nombreLargoEmpresa = "Nombre Largo de la Empresa";
    const nombreCortoEmpresa = "Nombre Corto";
    const Sprint = "1";

    const datosLLenos = [
        {
            integrante: 'Alejandro Rodríguez',
            tareas: 'Desarrollo Backend',
            nota: 0,
            comentarios: 'Buen trabajo en general.'
        },
        {
            integrante: 'María García',
            tareas: 'Diseño UI/UX',
            nota: 70,
            comentarios: 'Excelente creatividad.'
        },
        {
            integrante: 'Joaquín Pérez',
            tareas: 'Testing y QA',
            nota: 45,
            comentarios: 'Cumplió con todas las tareas asignadas.'
        },
        {
            integrante: 'Jhok Corrales',
            tareas: '',
            nota: 100, // Nota en negro
            comentarios: 'Cumplió con todas las tareas asignadas.'
        },
    ];

    const datosVacios = [];

    const datos = datosLLenos;

    return (
        <Fragment>
            <BaseUI
                titulo={'RESULTADOS EVALUACIONES SEMANALES PREVIAS'}
                dirBack={'/'}>
                <NombreSprint><h2>SPRINT {Sprint}</h2></NombreSprint>
                <Cuadrado>
                    <NombreEmpresa>
                        <h3>{nombreLargoEmpresa}</h3>
                        <h4>{nombreCortoEmpresa}</h4>
                    </NombreEmpresa>
                </Cuadrado>
                {datos.length > 0 && (
                    <TablaContainer>
                        <Tabla>
                            <thead>
                                <tr>
                                    <th>Integrante</th>
                                    <th>Tareas</th>
                                    <th>Nota (1-100)</th>
                                    <th>Comentarios</th>
                                </tr>
                            </thead>
                            <tbody>
                                {datos.map((fila, index) => (
                                    <Fila key={index} isLast={index === datos.length - 1}>
                                        <td>{fila.integrante}</td>
                                        {fila.tareas ? (
                                            <>
                                                <td>{fila.tareas}</td>
                                                <td>
                                                    <NotaContainer>
                                                        <Nota color={fila.nota < 51 ? 'red' : 'black'}>
                                                            {fila.nota >= 0 && fila.nota <= 100 ? fila.nota : 'Nota inválida'}
                                                        </Nota>
                                                    </NotaContainer>
                                                </td>
                                                <td>
                                                    <ComentarioContainer>
                                                        {fila.comentarios?.length > 200 ? `${fila.comentarios.slice(0, 200)}...` : fila.comentarios}
                                                    </ComentarioContainer>
                                                </td>
                                            </>
                                        ) : (
                                            <td colSpan="3" style={{ textAlign: 'center', height: '100%' }}>
                                                <MensajeVacio>Sin tareas asignadas</MensajeVacio>
                                            </td>
                                        )}
                                    </Fila>
                                ))}
                            </tbody>
                        </Tabla>
                    </TablaContainer>
                )}
                {datos.length === 0 && (
                    <MensajeVacio>No se han registrado calificaciones para este hito.</MensajeVacio>
                )}
            </BaseUI>
        </Fragment>
    );
}

export default CalificarEstSemana;

const NombreSprint = styled('div')({
    justifyContent: 'flex-start',
});

const Cuadrado = styled('div')({
    overflow: 'auto',
    border: '4px solid black',
    minHeight: '40px',
    width: '100%',
    textAlign: 'center',
    margin: '10px auto',
});

const NombreEmpresa = styled('div')({
    marginBottom: '10px',
});

const TablaContainer = styled('div')({
    overflowX: 'auto', 
    marginTop: '20px',
    width: '100%', 
});

const Tabla = styled('table')({
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '12px',
    borderTop: 'none',
    borderLeft: '2px solid #f9f9f9',
    borderRight: '2px solid #f9f9f9',
    borderBottom: '2px solid #dddddd',

    'th, td': {
        textAlign: 'left',
    },

    th: {
        backgroundColor: '#ffffff',
        fontWeight: 'bold',
        color: '#868a90',
        padding: 15,
    },

    'thead tr': {
        borderBottom: '2px solid  #e4e4e4',
    },

    td: {
        backgroundColor: '#ffffff',
        color: 'black',
        padding: '20px', 
    }
});

// Componente para cada fila
const Fila = styled('tr')(({ isLast }) => ({
    ...(isLast ? {} : { borderBottom: '2px solid #f9f9f9' }), 
}));

const NotaContainer = styled('div')({
    border: '2px solid #e4e4e4',
    borderRadius: '4px',
    padding: '10px',
    width: '35px',
    height: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
});

const Nota = styled('span')(({ color }) => ({
    color: color,
}));

const ComentarioContainer = styled('div')({
    border: '2px solid #e4e4e4',
    borderRadius: '4px',
    padding: '10px',
    width: '90%',
    height: '70px',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    overflow: 'hidden',
});


const MensajeVacio = styled('div')({
    fontWeight: 'bold',
    fontSize: '16px',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center', 
    alignItems: 'center',     
    height: '100%',            
    width: '100%',             
});
