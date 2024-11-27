import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import BaseUI from '../../../components/baseUI/baseUI';
import NombreEmpresa from '../../../components/infoEmpresa/nombreEmpresa';
import {decrypt} from '../../../api/decrypt'
import Cookies from 'js-cookie';
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
const NotaSprintTable = () => {
  const userRole = Cookies.get('random');
  const [role, setRole] = useState('docente')
  const idEmpresa = localStorage.getItem("idEmpresa")
  const [notas, setNotas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [nombreEmpresa, setNombreEmpresa] = useState({ nombreCorto: '', nombreLargo: '' });
  useEffect(() => {
    if(userRole){
      const role2 = decrypt(userRole);
      setRole(role2)
    }
    setLoading(true);
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
      console.log(data)
      setNotas(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const getNombreEmpresa = async (idEmpresa) => {
    setLoading(true);
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
      dirBack={role === 'docente'?`/homeDocente/listaEmpresaCalificaciones`:`/homeEstu`}
      loading={loading}
      error={error}
    >
    <NombreEmpresa nombreCorto={nombreEmpresa.nombreCorto} nombreLargo={nombreEmpresa.nombreLargo} />
    <TableContainer component={Paper}>
      <Table sx={{ borderCollapse: 'separate', borderSpacing: '1rem' }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: 'calc(10vw + 5rem)'}}>Nombre Integrante</TableCell>
            {sprints.map((sprint) => {
              const array = ((new Date()).toLocaleDateString()).split('/')
              const formatoDate =  ""+array[2]+"-"+array[1]+"-"+array[0]
              const splitIni = (sprint.fechaIni).split('-')
              const splitFin = (sprint.fechaFin).split('-')
              const formatoIni = ""+splitIni[1]+"/"+splitIni[2]
              const formatoFin = ""+splitFin[1]+"/"+splitFin[2]
              if(sprint.fechaFin <= formatoDate)
              return <TableCell key={sprint.idSprint} align='center' sx={{ width: 'calc(5vw + 2rem)'}}>
                Sprint {sprint.numeroSprint}
                <div>
                  <div style={{display:'flex', alignItems:'center'}}>
                    <CalendarTodayIcon></CalendarTodayIcon>
                    INI: {formatoIni}
                  </div>
                  <div style={{display:'flex', alignItems:'center'}}>
                    <CalendarTodayIcon></CalendarTodayIcon>
                    FIN: {formatoFin}  
                  </div>
                </div>
              </TableCell>
            })}
            <TableCell></TableCell>
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
                const array = ((new Date()).toLocaleDateString()).split('/')
                const formatoDate =  ""+array[2]+"-"+array[1]+"-"+array[0]
                if(sprint.fechaFin <= formatoDate)
                return (
                  <TableCell 
                    key={sprint.idSprint} 
                    sx={{ color: notaColor }}
                    align='center'>
                    {notaText}
                  </TableCell>
                );
              })}
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </BaseUI>
  );
};

export default NotaSprintTable;
