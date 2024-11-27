export const addRevision = async (idEmpresa, comentariopublico) => {
  const response = await fetch("http://127.0.0.1:8000/api/addRevision", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      idEmpresa: idEmpresa,
      comentariopublico: comentariopublico,
    }),
    credentials: 'include'
  });

  const data = await response.json();
  return data;
};
