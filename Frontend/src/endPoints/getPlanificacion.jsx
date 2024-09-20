export const getPlanificacion = async (idEmpresa) => {
  
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/planificacion/${idEmpresa}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Error al obtener los datos de la planificacion');
      }
  
      const data = await response.json();
      console.log(data)
      return data;
    } catch (error) {
      console.error('Error en la solicitud:', error);
      throw error;
    }
  };
  