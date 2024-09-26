export const getPlanificacion = async (idEmpresa) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/planificacion/${idEmpresa}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else if (response.status === 204) {
      console.log('La empresa existe, pero no tiene planificación registrada.');
      return null;
    } else if (response.status === 404) {
      throw new Error('Empresa no encontrada.');
    } else {
      throw new Error(`Error inesperado, código de estado: ${response.status}`);
    }

  } catch (error) {
    console.error('Error en la solicitud:', error);
    throw error;
  }
};
