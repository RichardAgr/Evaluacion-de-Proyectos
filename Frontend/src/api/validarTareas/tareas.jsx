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

    // Agregar archivos a FormData
    formData.files.forEach((file, index) => {
      // Si `file` es un objeto `File` (para archivos nuevos), se añade con FormData
      console.log(file)
      if (file.idArchivo === "-1" && file.file instanceof File) {
        data.append(`files[${index}][file]`, file.file); 
        data.append(`files[${index}][name]`, file.name); 
        data.append(`files[${index}][idArchivo]`, file.idArchivo);
        data.append(`files[${index}][url]`, file.url);
      } else {
        // Si no es un archivo nuevo, solo agrega `idArchivo` y otros metadatos
        data.append(`files[${index}][idArchivo]`, file.idArchivo);
        data.append(`files[${index}][name]`, file.name);
      }
    });

    // Agregar IDs de archivos eliminados
    formData.deletedFiles.forEach((idArchivo, index) => {
      data.append(`deletedFiles[${index}]`, idArchivo);
    });

    // Agregar responsables
    formData.responsables.forEach((responsable, index) => {
      data.append(`responsables[${index}][idEstudiante]`, responsable.idEstudiante);
    });

    // Enviar solicitud con FormData
    const response = await fetch(`http://127.0.0.1:8000/api/tarea/${idTarea}/guardar`, {
      method: "POST",
      body: data, // Usar FormData como cuerpo
    });

    if (!response.ok) {
      throw new Error("Error al actualizar la tarea");
    }

    return response;
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw error;
  }
};
