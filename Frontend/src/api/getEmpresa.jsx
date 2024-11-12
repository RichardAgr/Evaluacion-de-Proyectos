export const getEmpresaData = async (idEmpresa) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/empresa/${idEmpresa}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error al obtener los datos de la empresa");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw error;
  }
};

export const getEmpresaCalificaciones = async (idEmpresa) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/empresas/notasSprint/${idEmpresa}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error al obtener las calificaciones de la empresa");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw error;
  }
};

export const getSprintsEntregables = async (idEmpresa) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/empresa/${idEmpresa}/sprintsEntregables`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error al obtener los sprints y entregables");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw error;
  }
};

export const getSprintSemanasTareas = async (idEmpresa) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/empresa/${idEmpresa}/sprintsSemanasTareas`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        "Error al obtener los datos de los sprints, semanas y tareas"
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw error;
  }
};
