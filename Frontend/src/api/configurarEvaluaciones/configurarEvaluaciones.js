// definir la url inicial de la api
const BASE_URL = "http://localhost:8000/api";

/**
 * Obtiene las planificaciones que no fueron publicadas
 * @returns {Promise<Object>} Las planificaciones con su ID
 */
export async function configurarEvaluacion(datosEvaluacion) {
  try {
    const response = await fetch(`${BASE_URL}/configurarEvaluacion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosEvaluacion),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Error al configurar la evaluación"
      );
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error al configurar las evaluaciones:", error);
    throw error;
  }
}
