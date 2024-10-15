import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BaseUI from '../../../components/baseUI/baseUI.jsx';

const getGrupoDescripcion = async (idGrupo) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/grupoDescripcion/${idGrupo}`);
    if (!response.ok) {
      throw new Error('Error al obtener la descripción');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en la solicitud:', error);
    throw error;
  }
};

const enviarClave = async (idGrupo, clave, idEstudiante) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/asignarEstudiante`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idGrupo, clave, idEstudiante }),
    });

    const data = await response.json();

    if (response.status === 200) {
      alert('Matriculación exitosa: ' + response.message);
    } else if (response.status === 201) {
      alert('Matriculación fallida: ' + response.message);
    } else if (response.status === 400) {
      alert('El estudiante ya está inscrito en un grupo.');
    }

    return { status: response.status, message: data.message };
  } catch (error) {
    console.error('Error en la solicitud:', error);
    throw error;
  }
};

function GrupoDescripcion() {
  const { idGrupo } = useParams();
  const navigate = useNavigate();
  const [datos, setDatos] = useState(null);
  const [clave, setClave] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const idEstudiante = "31"; // Hardcodear el idEstudiante aquí

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getGrupoDescripcion(idGrupo);
        setDatos(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [idGrupo]);

  const handleEnviarClave = async (e) => {
    e.preventDefault();

    try {
      const response = await enviarClave(idGrupo, clave, idEstudiante);
      
      if (response.status === 200) {
        alert('Matriculación exitosa: ' + response.message);
      } else if (response.status === 201) {
        alert('Matriculación fallida: ' + response.message);
      }
      
      setClave('');
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <p>Cargando descripción...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <BaseUI titulo="Descripción del Grupo" ocultarAtras={false} confirmarAtras={true} dirBack={`/`}>
      <div className='pageBorder_interior'>
        {datos ? (
          <>
            <h2>{datos.nombreDocente} {datos.apellidoPaternoDocente} {datos.apellidoMaternoDocente} G{datos.numGrupo}</h2>
            <p>{datos.descripcion}</p>
            <form onSubmit={handleEnviarClave}>
              <div>
                <label style={{ marginRight: '20px' }} htmlFor="clave">CODIGO DE ACCESO:</label>
                <input
                  type="text"
                  id="clave"
                  placeholder='CODIGO'
                  value={clave}
                  onChange={(e) => setClave(e.target.value)}
                />
              </div>
              <button 
                type="submit" 
                style={{ 
                  backgroundColor: 'red', 
                  color: 'white', 
                  border: 'none', 
                  padding: '10px 20px', 
                  cursor: 'pointer', 
                  borderRadius: '5px', 
                  fontSize: '16px' 
                }}
              >
                MATRICULAME
              </button>
            </form>
          </>
        ) : (
          <p>No se encontraron datos para este grupo.</p>
        )}
        {error && <p>{error}</p>}
      </div>
    </BaseUI>
  );
}

export default GrupoDescripcion;
