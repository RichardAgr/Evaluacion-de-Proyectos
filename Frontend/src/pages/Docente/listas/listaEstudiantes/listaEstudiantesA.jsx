import React, { useEffect, useState } from 'react';
import BaseUI from "../../../../components/baseUI/baseUI";

function ObtenerEstudiantesPorGrupo() {
  const idGrupo = 1; // Hardcodeado
  const gestionGrupo = '2024-2'; // Hardcodeado
  
  const [estudiantes, setEstudiantes] = useState([]);
  const [error, setError] = useState(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const estudiantesPorPagina = 10;

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
    }
  };

  // Efecto para cargar los estudiantes al montar el componente
  useEffect(() => {
    fetchEstudiantes();
  }, []); // Solo se ejecuta una vez al montar

  // Función para manejar la búsqueda en tiempo real
  useEffect(() => {
    const handleSearch = async () => {
      if (!searchTerm.trim()) {
        fetchEstudiantes(); // Volver a cargar todos los estudiantes si el término está vacío
        return;
      }

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
        setEstudiantes(result);
      } catch (error) {
        console.error('Error en la solicitud:', error);
        setError(error.message);
      }
    };

    handleSearch(); // Llamar a la búsqueda inmediatamente
  }, [searchTerm]); // Solo se ejecuta cuando searchTerm cambia

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

  if (error) return <p>Error: {error}</p>;

  return (
    <BaseUI
      titulo={`LISTA DE ESTUDIANTES`}
      ocultarAtras={false}
      confirmarAtras={false}
      dirBack={`/`}
    >
      <h1>LISTA DE ESTUDIANTES</h1>

      {/* Barra de búsqueda */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Buscar Estudiante"
        style={{ marginBottom: '20px', padding: '8px', width: '200px' }}
      />

      <div className='pageBorder'>
        <div className='pageBorder_interior'>
          {estudiantesActuales.length === 0 ? (
            <p>No se encontraron estudiantes.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <table className='excelTable'>
                <thead>
                  <tr>
                    <th>ESTUDIANTE</th>
                    <th>EMPRESA</th>
                    <th>ACCIONES</th>
                  </tr>
                </thead>
                <tbody>
                  {estudiantesActuales.map((estudiante) => (
                    <tr key={estudiante.idEstudiante}>
                      <td>
                        {estudiante.nombreEstudiante} {estudiante.apellidoPaternoEstudiante} {estudiante.apellidoMaternoEstudiante}
                      </td>
                      <td>{estudiante.nombreEmpresa}</td>
                      <td>
                        <button onClick={() => handleDarDeBaja(estudiante.idEstudiante)}>Dar de baja</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className='pagination' style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>Anterior</button>
                <span>Página {currentPage} de {totalPaginas}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPaginas}>Siguiente</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </BaseUI>
  );

  function handleDarDeBaja(id) {
    console.log(`Dar de baja al estudiante con ID: ${id}`);
  }
}

// Estilos para la tabla y demás elementos
const styles = `
// Estilos aquí
`;

// Insertar estilos en el head del documento
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default ObtenerEstudiantesPorGrupo;
