import { Fragment, useState } from "react";
// import { useNavigate } from "react-router-dom";
import BaseUI from "../../../components/baseUI/baseUI";
import { Box } from "@mui/material";

function SprintTareas2() {
  const [isOpenSprint, setIsOpenSprint] = useState({});
  const [isOpenSemana, setIsOpenSemana] = useState({});

  const mockData = [
    {
      title: "Sprint 1",
      semanas: [
        {
          title: "Semana 1",
          tareas: [{ nombre: "Tarea 1" }, { nombre: "Tarea 2" }]
        },
        {
          title: "Semana 2",
          tareas: [{ nombre: "Tarea 3" }]
        }
      ]
    },
    {
      title: "Sprint 2",
      semanas: [
        {
          title: "Semana 1",
          tareas: [{ nombre: "Tarea 4" }]
        }
      ]
    }
  ];

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

  return (
    <Fragment>
      <BaseUI
        titulo="VISUALIZAR SPRINT"
        ocultarAtras={false}
        confirmarAtras={false}
        dirBack="/"
      >
        <Box sx={{ width: "90%", marginTop: 2 }}>
          {mockData.map((sprint, index) => (
            <Fragment key={index}>
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
                {sprint.title}
              </Box>

              {isOpenSprint[index] && (
                <Box sx={{ width: "90%", marginLeft: "2rem" }}>
                  {sprint.semanas.map((semana, semanaIndex) => (
                    <Fragment key={semanaIndex}>
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
                        {semana.title}
                      </Box>

                      {isOpenSemana[`${index}-${semanaIndex}`] && (
                        <Box sx={{ width: "80%", marginLeft: "3.5rem" }}>
                          {semana.tareas.length > 0 ? (
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
                                {tarea.nombre}
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
