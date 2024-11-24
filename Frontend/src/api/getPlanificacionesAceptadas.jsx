
export const getPlanificacionesAceptadas   = async () => {
  
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/planificacionAceptadas`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Error al obtener los datos de la empresa');
      }
  
      const data = await response.json();    
      return data;
    } catch (error) {
      console.error('Error en la solicitud:', error);
      throw error;
    }
  };
  