export const rechazar = async (idEmpresa) => {
    const rechazarResponse = await fetch("http://127.0.0.1:8000/api/rechazar", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idEmpresa }),
    });
  
    const data = await rechazarResponse.json();
  
    return data;
  };
  