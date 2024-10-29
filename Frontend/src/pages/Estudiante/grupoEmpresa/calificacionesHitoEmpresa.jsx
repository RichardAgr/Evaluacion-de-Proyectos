import { useState, useEffect } from 'react';
import Loading from '../../../components/loading/loading';
import Error from '../../../components/error/error';
import ListaDefinitiva from '../../../components/listaDefinitiva/listaDefinitiva';

const NotaSprintTable = () => {
  const empresaId = 1;
  const [notas, setNotas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    error: false,
    errorMessage: "",
    errorDetails: "",
  });
  const [nombreEmpresa, setNombreEmpresa] = useState({ nombreCorto: '', nombreLargo: '' });
  const [cabezeras, setCabezeras] = useState([]);
  const [datosTabla, setDatosTabla] = useState([]);

  useEffect(() => {
    getNombreEmpresa(empresaId);
    fetchNotas();
  }, []);

  const fetchNotas = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/api/empresas/notasSprint/${empresaId}`);
      if (!response.ok) {
        throw new Error('Error al obtener datos.');
      }
      const data = await response.json();
      setNotas(data);
      console.log(data)
      const sprints = new Set();
      const datos = Object.entries(data).map(([idEstudiante, estudiante]) => {
        Object.keys(estudiante.sprints).forEach(sprint => sprints.add(sprint));
        return {
          Nombre: estudiante.nombre,
          ...estudiante.sprints
        };
      });

      setCabezeras(['Nombre', ...Array.from(sprints)]);
      setDatosTabla(datos);
      
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

  const getNombreEmpresa = async (empresaId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/nombreEmpresa/${empresaId}`);
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

  if (loading) return <Loading />;
  if (error.error) return <Error errorMessage={error.errorMessage} errorDetails={error.errorDetails} />;

  return (
    <ListaDefinitiva
      titulo="VISUALIZAR CALIFICACIONES DE LA GRUPO EMPRESA"
      cabezeraTitulo={nombreEmpresa}
      cabezeras={cabezeras}
      datosTabla={datosTabla}
      ocultarAtras={false}
      confirmarAtras={false}
      dirBack="/"
      dirForward=""
    />
  );
};

export default NotaSprintTable;
