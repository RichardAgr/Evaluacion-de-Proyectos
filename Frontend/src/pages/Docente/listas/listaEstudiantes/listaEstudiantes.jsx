import { useEffect, useState } from 'react';
import BaseUI from "../../../../components/baseUI/baseUI";
import { styled } from '@mui/material';

function ObtenerEstudiantesPorGrupo() {
  const idGrupo = 1; // Hardcodeado
  const gestionGrupo = '2024-2'; // Hardcodeado
  
  const [estudiantes, setEstudiantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const estudiantesPorPagina = 20;

  // Función para obtener estudiantes
  const fetchEstudiantes = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/grupo/estudiantes/${idGrupo}/${gestionGrupo}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error de grupo');
      }

      const data = await response.json();
      setEstudiantes(data);
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEstudiantes();
  }, [idGrupo, gestionGrupo]);

  // Función para manejar la búsqueda
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      window.location.reload(); // Recargar la página para mostrar todos los datos
      return;
    }
    setLoading(true); // Iniciar carga
    try {
      const response = await fetch(`http://localhost:8000/api/grupo/estudiante/barraBusqueda`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          idGrupo, 
          gestionGrupo, 
          termino: searchTerm 
        }),
      });

      if (!response.ok) {
        throw new Error('Error en la búsqueda');
      }

      const result = await response.json();
      setEstudiantes(result); // Actualizar los estudiantes con los resultados de la búsqueda
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setError(error.message);
    } finally {
      setLoading(false); // Finalizar carga
    }
  };

  const totalPaginas = Math.ceil(estudiantes.length / estudiantesPorPagina);
  const indexOfLastEstudiante = currentPage * estudiantesPorPagina;
  const indexOfFirstEstudiante = indexOfLastEstudiante - estudiantesPorPagina;
  const estudiantesActuales = estudiantes.slice(indexOfFirstEstudiante, indexOfLastEstudiante);

  const handleNextPage = () => {
    if (currentPage < totalPaginas) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) return null; // Eliminar mensaje de carga
  if (error) return <p>Error: {error}</p>;

  return (
    <BaseUI
      titulo={`LISTA DE ESTUDIANTES`}
      ocultarAtras={false}
      confirmarAtras={false}
      dirBack={`/`}
    >
      {/* Barra de búsqueda */}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar Estudiante"
          style={{ marginBottom: '20px', padding: '8px', width: '200px' }}
        />
        <button type="submit">Buscar</button>
      </form>
      <Tabla>
        <thead>
          <tr>
            <th>ESTUDIANTE</th>
            <th>CODIGO SIS</th>
            <th>Nombre Grupo Empresa</th>
          </tr>
        </thead>
        <tbody>
          {estudiantesActuales.map((estudiante) => (
            <tr key={estudiante.idEstudiante}>
              <td>
                {estudiante.nombreEstudiante} {estudiante.apellidoPaternoEstudiante} {estudiante.apellidoMaternoEstudiante}
              </td>
              <td>falta codigo sis</td>
              <td>{estudiante.nombreEmpresa}</td>

            </tr>
          ))}
        </tbody>      
      </Tabla>

      {/* Componente de Paginación */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPaginas}
        totalItems={estudiantes.length}
        rowsPerPage={estudiantesPorPagina}
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
      />
    </BaseUI>
  );
}

const Tabla = styled('table')({
  width: '100%',
  borderCollapse: 'collapse',
  textAlign: 'left',

  'th, td': {
    padding: '12px 15px',
    textAlign: 'left',
    border: 'none', 
  },

  th: {
    color: 'black',
    fontWeight: 'bold',
    backgroundColor: '#f8f9fa',
    borderBottom: '2px solid #ddd', 
  },

  'td': {
    backgroundColor: '#fff',
    borderBottom: '1px solid #ddd', 
  },

  'tr:nth-of-type(even)': {
    backgroundColor: '#f2f2f2', 
  },
});

const Boton = styled('button')`
  box-sizing: border-box;
  margin-right: 5px;           
  border: none;                
  background-color: transparent; 
  font-size: 16px;            
  cursor: pointer;            
  padding: 10px;
  opacity: ${({ currentPage }) => (currentPage === 1 ? 0.5 : 1)}; 
`;

// eslint-disable-next-line react/prop-types
const Pagination = ({ currentPage, totalPages, totalItems, rowsPerPage, handlePreviousPage, handleNextPage }) => {
  const startRow = (currentPage - 1) * rowsPerPage + 1;
  const endRow = Math.min(currentPage * rowsPerPage, totalItems);

  return (
    <div className='pagination' style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', borderBottom: '2px solid #ddd', marginTop: '0px' }}>
      <div style={{ marginRight: '30px' }}>
        <span style={{ marginRight: '10px' }}>Filas por página:</span>
        <span>{rowsPerPage}</span>
      </div>
      <div style={{ marginRight: '30px' }}>
        <span>{startRow}-{endRow} de {totalItems}</span>
      </div>
      <div>
        <Boton onClick={handlePreviousPage} disabled={currentPage === 1}>&lt;</Boton>
        <Boton onClick={handleNextPage} disabled={currentPage === totalPages}>&gt;</Boton>
      </div>
    </div>
  );
};

export default ObtenerEstudiantesPorGrupo;
