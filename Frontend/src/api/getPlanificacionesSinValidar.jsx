
export const getPlanificacionesSinValidar   = async () => {
  
      const response = await fetch(`http://localhost:8000/api/planificacionesSinValidar`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });
      const responseData = await response.json();  
      return responseData;
  };