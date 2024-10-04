export const validar = async (idEmpresa) => {
  const validarResponse = await fetch("http://127.0.0.1:8000/api/validar", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ idEmpresa }),
  });

  const data = await validarResponse.json();

  return data;
};
