export const obtenerDatosDocente = async () => {
    const url = "http://localhost:8000/api/obtenerDatosDocente";
    const bodyFetch = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    };

    try {
      const res = await fetch(url, bodyFetch);
      const response = await res.json();
      return response
    } catch (error) {
      console.error("Error:", error);
    }
};

export const obtenerDatosEstudiante = async () => {
    const url = "http://localhost:8000/api/obtenerDatosEstudiante";
    const bodyFetch = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    };

    try {
      const res = await fetch(url, bodyFetch);
      const response = await res.json();
      return response
    } catch (error) {
      console.error("Error:", error);
    }
};

export const updatePerfil = async ()=>{

}

