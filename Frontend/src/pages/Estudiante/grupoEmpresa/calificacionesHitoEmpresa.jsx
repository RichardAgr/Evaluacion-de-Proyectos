import React, { useState, useEffect } from 'react';
import BaseUI from "../../../components/baseUI/baseUI";
import { styled } from '@mui/material';
import InfoEmpresa from '../../../components/infoEmpresa/nombreEmpresa'; // Ajusta la ruta según tu estructura de archivos

const NotaSprintTable = () => {
  const empresaId = 1; // Hardcodeado como 1
  const [notas, setNotas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [nombreEmpresa, setNombreEmpresa] = useState({ nombreCorto: '', nombreLargo: '' });

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

  // Obtener los nombres de los sprints para las columnas
  const sprints = Object.keys(notas).reduce((acc, idEstudiante) => {
    const estudiante = notas[idEstudiante];
    Object.keys(estudiante.sprints).forEach(sprint => {
      if (!acc.includes(sprint)) {
        acc.push(sprint);
      }
    });
    return acc;
  }, []);

  return (
    <BaseUI
      titulo="VISUALIZAR CALIFICACIONES DE LA GRUPO EMPRESA"
      ocultarAtras={false}
      confirmarAtras={false}
      dirBack="/"
    >
      <Container>
        <InfoEmpresa nombreCorto={nombreEmpresa.nombreCorto} nombreLargo={nombreEmpresa.nombreLargo} />
        {loading && <p>Cargando...</p>}
        {error && <ErrorMessage>{error}</ErrorMessage>}

        {Object.keys(notas).length > 0 && (
          <Table>
            <thead>
              <tr>
                <th>Nombre</th>
                {sprints.map((sprint, index) => (
                  <th key={index}>{sprint}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(notas).map(([idEstudiante, estudiante]) => (
                <tr key={idEstudiante}>
                  <td>{estudiante.nombre}</td>
                  {sprints.map((sprint) => (
                    <td key={sprint}>
                      {estudiante.sprints[sprint] !== undefined ? estudiante.sprints[sprint] : 'N/A'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </BaseUI>
  );
};

const Container = styled('div')({
  padding: '20px',
});

const Table = styled('table')({
  width: '100%',
  borderCollapse: 'collapse',
  'th, td': {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
  },
  'th': {
    backgroundColor: '#f2f2f2',
  },
});

const ErrorMessage = styled('p')({
  color: 'red',
});

export default NotaSprintTable;
