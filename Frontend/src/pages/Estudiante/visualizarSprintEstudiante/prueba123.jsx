import { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BaseUI from "../../../components/baseUI/baseUI";
import { Box } from "@mui/material";
import { getSprintSemanasTareas } from "../../../api/getEmpresa";

function SprintTareas2() {
  const { idEmpresa } = useParams(); 
  const [isOpenSprint, setIsOpenSprint] = useState({});
  const [isOpenSemana, setIsOpenSemana] = useState({});
  const [sprintsData, setSprintsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSprints = async () => {
      try {
        const data = await getSprintSemanasTareas(idEmpresa);
        setSprintsData(data);  
        console.log(data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSprints();
  }, [idEmpresa]);

  const toggleSprint = (index) => {
    setIsOpenSprint((prevState) => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  const toggleSemana = (semanaIndex, sprintIndex) => {
    const key = `${sprintIndex}-${semanaIndex}`;
    setIsOpenSemana((prevState) => ({
      ...prevState,
      [key]: !prevState[key]
    }));
  };

  if (loading) {
    return <div>Cargando datos...</div>;
  }

  return (
    <Fragment>
      <BaseUI
        titulo="VISUALIZAR SPRINT"
        ocultarAtras={false}
        confirmarAtras={false}
        dirBack="/"
      >
        <Box sx={{ width: "90%", marginTop: 2 }}>
          {sprintsData.map((sprint, index) => (
            <Fragment key={sprint.idSprint}>
              <Box
                onClick={() => toggleSprint(index)}
                sx={{
                  width: "90%",
                  height: 60,
                  borderRadius: 0.6,
                  margin: 0.7,
                  pl: 2,
                  fontSize: "1.5rem",
                  bgcolor: "#b0bec5",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  "&:hover": { bgcolor: "#90a4ae" },
                }}
              >
                {isOpenSprint[index] ? (
                  <div className="arrow-down"></div>
                ) : (
                  <div className="arrow-right"></div>
                )}
                {`Sprint ${sprint.numeroSprint}`}
              </Box>

              {isOpenSprint[index] && (
                <Box sx={{ width: "90%", marginLeft: "2rem" }}>
                  {sprint.semanas && sprint.semanas.map((semana, semanaIndex) => (
                    <Fragment key={semana.idSemana}>
                      <Box
                        onClick={() => toggleSemana(semanaIndex, index)}
                        sx={{
                          width: "85%",
                          height: 50,
                          borderRadius: 0.6,
                          margin: 0.7,
                          pl: 2,
                          fontSize: "1.3rem",
                          bgcolor: "#cfd8dc",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          "&:hover": { bgcolor: "#b0bec5" },
                        }}
                      >
                        {isOpenSemana[`${index}-${semanaIndex}`] ? (
                          <div className="arrow-down"></div>
                        ) : (
                          <div className="arrow-right"></div>
                        )}
                        {`Semana ${semana.numeroSemana}`}
                      </Box>

                      {isOpenSemana[`${index}-${semanaIndex}`] && (
                        <Box sx={{ width: "80%", marginLeft: "3.5rem" }}>
                          {semana.tareas && semana.tareas.length > 0 ? (
                            semana.tareas.map((tarea, tareaIndex) => (
                              <Box
                                key={tareaIndex}
                                sx={{
                                  width: "85%",
                                  height: 50,
                                  borderRadius: 0.6,
                                  margin: 0.7,
                                  pl: 2,
                                  fontSize: "1rem",
                                  bgcolor: "#eceff1",
                                  display: "flex",
                                  alignItems: "center",
                                  cursor: "pointer",
                                  "&:hover": { bgcolor: "#cfd8dc" },
                                }}
                              >
                                {tarea.nombreTarea}
                              </Box>
                            ))
                          ) : (
                            <Box
                              sx={{
                                width: "80%",
                                height: 50,
                                borderRadius: 0.6,
                                margin: 0.7,
                                pl: 2,
                                textAlign: "center",
                                fontSize: "1rem",
                                bgcolor: "#eceff1",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              No hay tareas asignadas.
                            </Box>
                          )}
                        </Box>
                      )}
                    </Fragment>
                  ))}
                </Box>
              )}
            </Fragment>
          ))}
        </Box>
      </BaseUI>
    </Fragment>
  );
}

export default SprintTareas2;
