import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import BaseUI from '../../../components/baseUI/baseUI';
import NombreEmpresa from '../../../components/infoEmpresa/nombreEmpresa';
const NotaSprintTable = () => {
  const { idEmpresa } = useParams();
  const [notas, setNotas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [nombreEmpresa, setNombreEmpresa] = useState({ nombreCorto: '', nombreLargo: '' });
  useEffect(() => {
    getNombreEmpresa(idEmpresa);
    fetchNotas();
  }, []);

  const fetchNotas = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/api/empresa/${idEmpresa}/sprints-estudiantes`);
      if (!response.ok) {
        throw new Error('Error al obtener los datos.');
      }
      const data = await response.json();
      setNotas(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const getNombreEmpresa = async (idEmpresa) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/nombreEmpresa/${idEmpresa}`);
      if (!response.ok) {
        throw new Error('Error al obtener los datos de la empresa');
      }
      const data = await response.json();
      setNombreEmpresa({ nombreCorto: data.nombreEmpresa, nombreLargo: data.nombreLargo });
    } catch (err) {
      setError({
        error: true,
        errorMessage: err.message,
        errorDetails: err,
      });
    } finally {
      setLoading(false);
    }
  };

  const sprints = notas.sprints || [];
  const estudiantes = notas.estudiantes || [];

  return (
    <BaseUI
      titulo="VISUALIZAR CALIFICACIONES DE LA GRUPO EMPRESA"
      ocultarAtras={false}
      confirmarAtras={false}
      dirBack="/"
      loading={loading}
      error={error}
    >
    <NombreEmpresa nombreCorto={nombreEmpresa.nombreCorto} nombreLargo={nombreEmpresa.nombreLargo} />
    <TableContainer component={Paper}>
      <Table sx={{ borderCollapse: 'separate', borderSpacing: '1rem' }}>
        <TableHead>
          <TableRow>
            <TableCell>Estudiante</TableCell>
            {sprints.map((sprint) => (
              <TableCell key={sprint.idSprint}>Sprint {sprint.numeroSprint}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {estudiantes.map((estudiante) => (
            <TableRow key={estudiante.idEstudiante}>
              <TableCell>{`${estudiante.nombreEstudiante} ${estudiante.primerApellido} ${estudiante.segundoApellido}`}</TableCell>
              {sprints.map((sprint) => {
                const nota = sprint.nota;
                const notaText = nota === null ? 'N/A' : nota;
                const notaColor = nota === null || nota >= 51 ? 'inherit' : 'red'; // Rojo si es menor a 51

                return (
                  <TableCell 
                    key={sprint.idSprint} 
                    sx={{ color: notaColor }}>
                    {notaText}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </BaseUI>
  );
};

export default NotaSprintTable;
