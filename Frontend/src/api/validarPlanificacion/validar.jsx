export const validar = async (idEmpresa) => {
  const validarResponse = await fetch("http://localhost:8000/api/validar", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ idEmpresa }),
    credentials: 'include'
  });

  const data = await validarResponse.json();

  return data;
};
