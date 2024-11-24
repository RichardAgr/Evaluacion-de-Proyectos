import { useEffect } from 'react';
import Loading from '../../../components/loading/loading';
import { useNavigate } from 'react-router-dom';
function RedirigirHome() {
  const navigate =useNavigate()
  useEffect(()=>{
    const getOrigin = async() =>{
      const link = 'http://localhost:8000/api/estudiante/getDataEstudiante'
      const body = {
        method: "GET",
        headers: {"Content-Type": "application/json"},
        credentials: 'include'
      }
      
      fetch(link, body)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          return res.json();
        })
        .then((response) => {
          const tieneGrupo = response.idGrupo;
          if (tieneGrupo === -1) {
            localStorage.setItem("idEstudiante", response.idEstudiante);
            navigate("/GruposDocente");
          } else {
            localStorage.setItem("idEstudiante", response.idEstudiante);
            localStorage.setItem("nombreCompleto", response.nombreCompleto);
            localStorage.setItem("idEmpresa", response.idEmpresa);
            localStorage.setItem("idPlanificacion", response.idPlanificacion);
            localStorage.setItem("aceptada", response.aceptada);
            localStorage.setItem("publicada", response.publicada);
            localStorage.setItem("idSprint", response.idSprint);
            localStorage.setItem("idSemana", response.idSemana);
            localStorage.setItem("idGrupo", response.idGrupo);
            navigate("/homeEstu");
          }
        })
        .catch((error) => {
          console.log("Fetch error: ", error);
        });

    }
    getOrigin()
  },[])
  return (
        <Loading></Loading>
  );
}

export default RedirigirHome;