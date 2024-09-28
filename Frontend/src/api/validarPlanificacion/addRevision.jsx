
export const addRevision = async (idEmpresa, nota, comentario, idDocente) => {
    const data = {
      idEmpresa,
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
      throw new Error(response.message );
    }
  
    return await response.json();;
  };
  