// api/empresa.js

// export const getEmpresaData = async (idEmpresa) => {
//     try {
//         const response = await fetch(`http://127.0.0.1:8000/empresa/${idEmpresa}`);

//       if (!response.ok) {
//         throw new Error('Error al obtener los datos de la empresa');
//       }
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error('Error en la solicitud:', error);
//       throw error;
//     }
//   };

export const getEmpresaData = async (idEmpresa) => {
  
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/empresa/${idEmpresa}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener los datos de la empresa');
    }

    const data = await response.json();    
    // Imprime el JSON en la consola
    console.log('Datos obtenidos:', data);
    return data;
  } catch (error) {
    console.error('Error en la solicitud:', error);
    throw error;
  }
};

