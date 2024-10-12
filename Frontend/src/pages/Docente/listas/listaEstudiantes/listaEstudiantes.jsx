import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../../../components/Header/header.jsx';
import Footer from '../../../../components/Footer/footer.jsx';
import ButtonBackAndTitle from '../../../../components/buttonBackAndTitle/buttonBackAndTitle.jsx';

function ObtenerEstudiantesPorGrupo() {
  const { idGrupo, gestionGrupo } = useParams();

  const [estudiantes, setEstudiantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const estudiantesPorPagina = 10;

  const fetchEstudiantes = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/grupo/estudiantes/${idGrupo}/${gestionGrupo}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error al obtener estudiantes');
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

  if (loading) return <p>Cargando estudiantes...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <React.Fragment>
      <Header />
      <div className='box'>
        <div className='container'>
          <ButtonBackAndTitle 
            datosTitleBack={{ ocultarAtras: false, titulo: 'ESTUDIANTES POR GRUPO' }}
          /> <h1>LISTA DE ESTUDIANTES</h1>
          <div className='pageBorder'>
            <div className='pageBorder_interior'>
              {estudiantes.length === 0 ? (
                <p>No se encontraron estudiantes.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <table className='table' style={{ flexGrow: 1 }}>
                    <thead>
                      <tr><style>
  {`
    .table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
    .table th, .table td {
      border: 1px solid #ddd;
      padding: 10px;
      text-align: left;
    }
    .table th {
      background-color: #f2f2f2;
      font-weight: bold;
    }
    .table tr:hover {
      background-color: #f1f1f1;
    }
    .table td {
      vertical-align: middle;
    }
    .pagination {
      display: flex;
      justify-content: flex-end; /* Alinear a la derecha */
      margin-top: 20px;
    }
    .pagination button {
      margin: 0 5px;
    }
  `}
</style>

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
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );

  function handleDarDeBaja(id) {
    console.log(`Dar de baja al estudiante con ID: ${id}`);
  }
}

export default ObtenerEstudiantesPorGrupo;
