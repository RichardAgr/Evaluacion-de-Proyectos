import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BaseUI from "../../../components/baseUI/baseUI.jsx";
import { styled } from "@mui/material";

const getGruposDocentes = async () => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/grupos", {
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
        console.error("Error en la solicitud:", error.message);
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
    <Fragment>
      <BaseUI
        titulo={`LISTA DE DOCENTES DISPONIBLES`}
        ocultarAtras={false}
        confirmarAtras={false}
        dirBack={`/`}
      >
        <DivLista>
          {grupos.map((grupo, index) => (
            <ListaDocente key={index} onClick={() => handleMatricularse(grupo)}>
              <div >
                {/* <td>{grupo.numGrupo}</td> */}
                <h2 style={{ fontWeight: '450' }}>
                   {">"} {grupo.apellidoPaterno} {grupo.apellidoMaterno} {grupo.nombre}
                </h2>
              </div>
            </ListaDocente>
          ))}
        </DivLista>
      </BaseUI>
    </Fragment>
  );
}

export default GruposDocentes;

const ListaDocente = styled("div")`
  display: flex;
  width: 83%;
  cursor: pointer;
  padding: 17px;
  background-color: #d0d4e4;
  user-select: none;
  margin: auto;
  margin-bottom: 0.2rem;
  margin-top: 0.2rem;
  overflow: auto;
`;

const DivLista = styled("div")`
  display: flex;
  flex-direction: column;
  margin: 2rem;
`;
