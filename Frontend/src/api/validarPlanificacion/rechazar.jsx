export const rechazar = async (idEmpresa) => {
    const rechazarResponse = await fetch("http://localhost:8000/api/rechazar", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idEmpresa }),
      credentials: 'include'
    });
  
    const data = await rechazarResponse.json();
  
    return data;
  };
  