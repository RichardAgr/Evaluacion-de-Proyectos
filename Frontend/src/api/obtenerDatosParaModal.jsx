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

export const updateDatosEstudiante = async (values) => {
    const url = "http://localhost:8000/api/modificarDatosEstudiante";
    const bodyFetch = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
      credentials: "include",
    };

    try {
      const res = await fetch(url, bodyFetch);
      const response = res.json()
      return response
    } catch (error) {
      console.error("Error:", error);
    }
};

export const updateDatosDocente = async (values) => {
    const url = "http://localhost:8000/api/modificarDatosDocente";
    const bodyFetch = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
      credentials: "include",
    };

    try {
      const res = await fetch(url, bodyFetch);
      const response = res.json()
      return response
    } catch (error) {
      console.error("Error:", error);
    }
};

