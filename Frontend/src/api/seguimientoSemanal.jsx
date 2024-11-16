export const getSeguimiento = async (idEmpresa) => {
    try {
        const response = await fetch(`http://localhost:8000/api/seguimientoSemanal/${idEmpresa}/SprintHastaSemanalActual`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error al obtener los datos de las tareas');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en la solicitud:', error);
        throw error;
    }
};