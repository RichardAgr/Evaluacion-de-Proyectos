export const publicarPlanificacion = async (idEmpresa) => {
    const response = await fetch("http://localhost:8000/api/publicarPlanificacion", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        idEmpresa: idEmpresa,
      }),
      credentials: 'include'
    });
  
    const data = await response.json();
    return data;
  };
  