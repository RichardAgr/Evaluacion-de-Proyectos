export const validar = async (idPlanificacion) => {
    const validarResponse = await fetch("http://127.0.0.1:8000/api/validar", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idPlanificacion }),
    });
  
    if (!validarResponse.ok) {
      throw new Error("Error al validar la planificación.");
    }
  
    return await validarResponse.json();
  };