import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/Header/header.jsx';
import Footer from '../../../components/Footer/footer.jsx';
import ButtonBackAndTitle from '../../../components/buttonBackAndTitle/buttonBackAndTitle.jsx';

const getGruposDocentes = async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/grupos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else if (response.status === 404) {
      console.log('No se encontraron grupos.');
      return null;
    } else {
      throw new Error(`Error inesperado, código de estado: ${response.status}`);
    }

  } catch (error) {
    console.error('Error en la solicitud:', error);
    throw error;
  }
};

function GruposDocentes() {
  const [grupos, setGrupos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Usar useNavigate para la redirección

  useEffect(() => {
    const fetchData = async () => {
      try {
        const gruposData = await getGruposDocentes();
        if (gruposData) {
          setGrupos(gruposData);
        } else {
          setGrupos([]);
        }
      } catch (error) {
        console.error('Error en la solicitud:', error.message);
        setError(`Error en la solicitud: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleMatricularse = (grupo) => {
    const url = `/homeEstudiante/inscribirGrupo/${grupo.idGrupo}`; // Cambia esta línea con la URL adecuada
    navigate(url); // Redirigir a la nueva página
  };

  return (
    <React.Fragment>
      <Header />
      <div className='box'>
        <div className='container'>
          <ButtonBackAndTitle 
            datosTitleBack={{ ocultarAtras: false, titulo: 'LISTA DE GRUPOS Y DOCENTES' }}
          />
          <div className='pageBorder'>
            <div className='pageBorder_interior'>
              {grupos.length === 0 ? (
                <p>No se encontraron grupos.</p>
              ) : (
                <table className='table'>
                  <thead>
                    <tr>
                      <th>Grupo</th>
                      <th>Docente</th>
                      <th>Apellidos</th>
                      <th>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {grupos.map((grupo, index) => (
                      <tr key={index}>
                        <td>{grupo.numGrupo}</td>
                        <td>{grupo.nombre}</td>
                        <td>{grupo.apellidoPaterno} {grupo.apellidoMaterno}</td>
                        <td>
                          <button onClick={() => handleMatricularse(grupo)}>Matricularse</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default GruposDocentes;
