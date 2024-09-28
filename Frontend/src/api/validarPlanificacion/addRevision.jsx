
export const addRevision = async (idPlanificacion, nota, comentario, idDocente) => {
    const data = {
      idPlanificacion,
      nota,
      comentario,
      idDocente,
    };
  
    const response = await fetch("http://127.0.0.1:8000/api/addRevision", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  
  
  
    if (!response.ok) {
      throw new Error(result.message || "Error al procesar la solicitud.");
    }
  
    return await response.json();;
  };
  