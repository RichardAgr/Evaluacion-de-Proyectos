
export const getPlanificacionesSinValidar   = async () => {
  
      const response = await fetch(`http://127.0.0.1:8000/api/planificacionesSinValidar`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });
      const responseData = await response.json();  
      return responseData;
  };