import { Fragment, useState, useEffect } from "react";
import BaseUI from "../../../../components/baseUI/baseUI";
import { styled } from "@mui/material";
import InfoEmpresa from "../../../../components/infoEmpresa/nombreEmpresa";

function CalificarEstSemana() {
    const empresaId = 1; // Hardcodeado como 1
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [nombreEmpresa, setNombreEmpresa] = useState({ nombreCorto: '', nombreLargo: '' });
    const [notas, setNotas] = useState([]);

    const fetchNotas = async () => {
        setLoading(true);
        setError('');
        try {
          const response = await fetch(`http://localhost:8000/api/empresas/notasSprint/${empresaId}`);
          if (!response.ok) {
            throw new Error('Error al obtener datos.');
          }
          const data = await response.json();
          setNotas(data);
          console.log(notas)
        } catch (err) {
          setError('Error al obtener datos. Verifica el ID de la empresa.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
    

    const getNombreEmpresa = async (empresaId) => {
        try {
          const response = await fetch(`http://127.0.0.1:8000/api/nombreEmpresa/${empresaId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          if (!response.ok) {
            throw new Error('Error al obtener los datos de la empresa');
          }
    
          const data = await response.json();    
          setNombreEmpresa({ nombreCorto: data.nombreEmpresa, nombreLargo: data.nombreLargo });
        } catch (error) {
          setError('Error al obtener el nombre de la empresa.');
          console.error('Error en la solicitud:', error);
        }
      };

      useEffect(() => {
        getNombreEmpresa(empresaId); // Obtener el nombre de la empresa al montar el componente
        fetchNotas(); // Llama a la función al montar el componente
      }, []);
    
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


    const datos = datosLLenos;

    return (
        <Fragment>
            <BaseUI
                titulo={'RESULTADOS EVALUACIONES SEMANALES PREVIAS'}
                dirBack={'/'}>
                <NombreSprint><h2>SPRINT {Sprint}</h2></NombreSprint>
                <InfoEmpresa nombreCorto={nombreEmpresa.nombreCorto} nombreLargo={nombreEmpresa.nombreLargo} />
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
