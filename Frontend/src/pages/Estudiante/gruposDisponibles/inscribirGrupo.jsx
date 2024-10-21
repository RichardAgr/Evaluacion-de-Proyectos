import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BaseUI from '../../../components/baseUI/baseUI.jsx';
import { styled } from '@mui/material';


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

    return { status: response.status, message: data.message };
  } catch (error) {
    console.error('Error en la solicitud:', error);
    throw error;
  }
};

function GrupoDescripcion() {
  const [clave, setClave] = useState('');
  const { idGrupo } = useParams();
  const [datos, setDatos] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false); 
  const [modalMessage, setModalMessage] = useState(''); 

  const esCodigoValido = clave.length === 8;
  const idEstudiante = "24"; // Hardcodear el idEstudiante aquí

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

    if (!esCodigoValido) {
      setError('Código de Acceso inválido.'); 
      return;
    }

    try {
      const response = await enviarClave(idGrupo, clave, idEstudiante);

      if (response.status === 200) {
        setModalMessage('Matriculación exitosa: ' + response.message);
      } else {
        setModalMessage('Matriculación fallida: ' + response.message);
      }
      setModalOpen(true); // Abrir el modal
      setClave('');
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  if (loading) return <p>Cargando descripción...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <BaseUI titulo="MATRICULARSE CON UN DOCENTE" ocultarAtras={false} confirmarAtras={true} dirBack={`/`}>
      <h1 style={{ fontSize: '25px' }}>
        {datos.apellidoPaternoDocente} {datos.apellidoMaternoDocente} {datos.nombreDocente} G{datos.numGrupo}
      </h1>
      <div style={{ padding: '10px', margin: '20px 10px 0px', minHeight: '200px', overflowY: 'auto', }}>
        {datos.descripcion}
      </div>
      <PagCentrpo>
        <form onSubmit={handleEnviarClave} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ margin: '100px 10px 0px', display: 'flex', alignItems: 'center' }}>
            <label style={{ marginRight: '15px' }} htmlFor="clave">Código de Acceso:</label>
            <InputCentro
              type="text"
              id="clave"
              placeholder='CODIGO'
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              maxLength={8}
            />
          </div>
          <BotonRojo type="submit" disabled={!esCodigoValido}>MATRICULARSE</BotonRojo>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </PagCentrpo>

      {/* Modal para mostrar el mensaje */}
      {modalOpen && (
        <ModalOverlay>
          <ModalContent>
            <h2>{modalMessage}</h2>
            <BotonRojo onClick={handleCloseModal}>Cerrar</BotonRojo>
          </ModalContent>
        </ModalOverlay>
      )}
    </BaseUI>
  );
}

export default GrupoDescripcion;

// Estilos para el modal
const ModalOverlay = styled('div')`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled('div')`
  background: white;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
`;

const PagCentrpo = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BotonRojo = styled('button')`
  justify-content: center;
  background-color: #e30613; 
  color: white; 
  width: 170px;
  height: 26px;
  border: none;
  cursor: pointer;
  margin: 20px 10px;
`;

const InputCentro = styled('input')`
  color: black;
  box-sizing: border-box;
  justify-content: center;
  width: 150px;
  height: 30px;
  background-color: #d0d4e4; 
  border: none;
  border-radius: 2px;
  padding-left: 5px;
`;
