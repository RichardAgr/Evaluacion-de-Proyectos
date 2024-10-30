import { Fragment, useState,useEffect } from "react";
import BaseUI from "../../../components/baseUI/baseUI.jsx";
import TablaEvaluacionSemanal from "../../../components/tablaEvaluacionSemanal/tablaEvaluacionSemanal.jsx";
import NombreEmpresa from  "../../../components/infoEmpresa/nombreEmpresa.jsx";
import { useParams } from "react-router-dom";

const EvaluarHito = () => {
  const { idEmpresa, idSprint } = useParams();
  const [nombreEmpresa, setNombreEmpresa] = useState({ nombreCorto: '', nombreLargo: '' });

  const getNombreEmpresa = async (idEmpresa) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/nombreEmpresa/${idEmpresa}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) throw new Error('Error al obtener los datos de la empresa');

        const data = await response.json();    
        setNombreEmpresa({ nombreCorto: data.nombreEmpresa, nombreLargo: data.nombreLargo });
    } catch (error) {
        console.error('Error en la solicitud:', error);
        setError(error.message);
    }
  };
    useEffect(() => {
        getNombreEmpresa(idEmpresa);
    }, []);


  return (
    <Fragment>
      <BaseUI
        titulo={"EVALUAR HITO"}
        ocultarAtras={false}
        confirmarAtras={false}
        dirBack={"/"}
      > 
        <h1>Sprint {idSprint}</h1>
        <NombreEmpresa
          nombreCorto={nombreEmpresa.nombreCorto}
          nombreLargo={nombreEmpresa.nombreLargo}
        />
        <TablaEvaluacionSemanal idEmpresa={idEmpresa}/>
      </BaseUI>
    </Fragment>
  );
};

export default EvaluarHito;