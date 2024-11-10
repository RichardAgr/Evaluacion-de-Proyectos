export const getTareaData = async (idTarea) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/tarea/${idTarea}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener los datos de la tarea");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw error;
  }
};

export const calificarTarea = async (idTarea, nota, comentario_docente) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/tarea/${idTarea}/calificar`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nota,
          comentario_docente,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Error al guardar la calificación");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw error;
  }
};

export const updateTarea = async (idTarea, formData) => {
  try {
    // Crear objeto FormData para enviar archivos correctamente
    const data = new FormData();
    data.append('idTarea', idTarea);
    data.append('textotarea', formData.descripcion);

    // Agregar responsables
    formData.responsables.forEach((responsable, index) => {
      data.append(
        `responsables[${index}][idEstudiante]`,
        responsable.idEstudiante
      );
    });

    // Enviar solicitud con FormData
    const response = await fetch(
      `http://127.0.0.1:8000/api/tarea/${idTarea}/guardar`,
      {
        method: "POST",
        body: data,
      }
    );

    if (!response.ok) {
      throw new Error("Error al actualizar la tarea");
    }

    return response;
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw error;
  }
};

export const getTareasSemana = async (idEmpresa, idSprint, idSemana) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/empresa/${idEmpresa}/sprint/${idSprint}/semana/${idSemana}/tareas`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error al obtener las tareas");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw error;
  }
};

export const updateTareasSemana = async (
  idEmpresa,
  idSprint,
  idSemana,
  tareas
) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/empresa/${idEmpresa}/sprint/${idSprint}/semana/${idSemana}/tareas`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tareas: tareas.map((task) => ({
            idTarea: task.idTarea ?? null, // idTarea será null si es una nueva tarea
            nombreTarea: task.nombreTarea,
            comentario: task.comentario ?? "",
            fechaEntrega: task.fechaEntrega ?? null,
            deleted: task.deleted ?? false,
          })),
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Error al actualizar las tareas");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw error;
  }
};
