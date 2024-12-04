export const getEmpresasDocente = async (idDocente) => {
    try {
        const response = await fetch(`http://localhost:8000/api/docente/${idDocente}/empresas`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Error al obtener los datos del docente');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en la solicitud:', error);
        throw error;
    }
};