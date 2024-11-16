import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import BaseUI from "../../../components/baseUI/baseUI.jsx";
import { Box, styled } from "@mui/material";

const getGruposDocentes = async () => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/estudiante/gruposDocente", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else if (response.status === 404) {
      console.log("No se encontraron grupos.");
      return null;
    } else {
      throw new Error(`Error inesperado, código de estado: ${response.status}`);
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw error;
  }
};

const estaMatriculado = async (idEstudiante) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/estaMatriculado/${idEstudiante}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data.enGrupo;  // Guardar si el estudiante está matriculado (1 o 0)
  } catch (error) {
    console.error("Error al verificar matrícula:", error);
    throw error;
  }
};

function GruposDocentes() {
  const { idEstudiante } = useParams(); 
  const [grupos, setGrupos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isMatriculado,setIsMatriculado] =useState();
  const navigate = useNavigate(); // Usar useNavigate para la redirección

  useEffect(() => {
    const fetchData = async () => {
      try {
        const gruposData = await getGruposDocentes();
        const matriculado = await estaMatriculado(idEstudiante);
        setIsMatriculado(matriculado);
        if (gruposData) {
          setGrupos(gruposData);
        } else {
          setGrupos([]);
        }
      } catch (error) {
        console.error("Error en la solicitud:", error.message);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [idEstudiante]);

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleMatricularse = (grupo) => {
    const url = `/homeEstudiante/inscribirGrupo/${idEstudiante}/${grupo.idGrupo}`; 
    navigate(url); 
  };



  return (
    <Fragment>
      <BaseUI
        titulo={`SELECCIONAR UN DOCENTE PARA MATRICULARSE`}
        ocultarAtras={false}
        confirmarAtras={false}
        dirBack={`/`}
        loading={loading}
        error={{error:error}}
      >
        {/* Si el estudiante está matriculado, mostrar solo el mensaje centrado */}
        {isMatriculado === 1 ? (
          <Box 
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
              color: 'red',
              fontWeight: 'bold',
              fontSize: '1.5rem',
            }}
          >
            Ya estás matriculado en un grupo
          </Box>
        ) : (
          <DivLista>
            {grupos.map((grupo, index) => (
              <Box 
                key={index} 
                onClick={() => handleMatricularse(grupo)}
                sx={{
                  width: '70%',
                  height: 60,
                  borderRadius: 1,
                  margin: 0.7,
                  pl:6,
                  textAlign: 'center',
                  fontSize: '1.5rem',
                  bgcolor: '#d0d4e4', 
                  display: 'flex', 
                  cursor: 'pointer',
                  justifyContent: 'flex-start', 
                  alignItems: 'center', 
                  '&:hover': {
                    bgcolor: '#a9afc1', 
                  },
                }}            
              >
                {grupo.apellidoPaterno} {grupo.apellidoMaterno} {grupo.nombre}
              </Box>
            ))}
          </DivLista>
        )}
      </BaseUI>
    </Fragment>
  );
}

export default GruposDocentes;


const DivLista = styled("div")`
  display: flex;
  flex-direction: column;
  margin: 2rem;
`;
