export const getSprintSemanas = async (idSprint) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/estudiante/sprint/semana/${idSprint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error al obtener los datos del sprint');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en la solicitud:', error);
        throw error;
    }
};

//${idSprint}

