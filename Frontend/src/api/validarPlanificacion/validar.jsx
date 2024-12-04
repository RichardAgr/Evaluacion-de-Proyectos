export const validar = async (idEmpresa) => {
  const validarResponse = await fetch("http://localhost:8000/api/validar", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ 
      idEmpresa:idEmpresa,
      fechaIni:localStorage.getItem('fechaLimiteEntregaPlanificacion'),
      fechaFin:localStorage.getItem('fechaFinPlanificacion')
    }),
    credentials: 'include'
  });

  const data = await validarResponse.json();

  return data;
};
