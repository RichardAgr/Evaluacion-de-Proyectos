export const addRevision = async (idEmpresa, nota, comentario, idDocente) => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/addRevision", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        idEmpresa: idEmpresa,
        nota: nota,
        comentario: comentario,
        idDocente: idDocente,
      }),
    });

    const data = await response.json();
    {/** console.log(response.status);
    if (response.status === 200) {
      console.log(data.message);
      return data;  
    } else if (response.status === 422) {
      console.log(data.message);
      console.log(data.errors);
      return data;
    } else if (response.status === 500) {
      console.log(data.message);
      console.log(data.error);
      return data;
    } else {
      console.log("Error desconocido");
      return null;
    }  */}
      return data
  } catch (error) {
    console.log(error);
    return null;
  }
};
