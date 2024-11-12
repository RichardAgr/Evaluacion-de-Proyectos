import { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BaseUI from '../../../components/baseUI/baseUI';
import { getSprintSemanas } from '../../../api/sprintApi.jsx'; 
import SprintSemanas from '../../../components/SprintTareas/sprintSemanas';
import { Box } from '@mui/material';
import { getSprintSemanasTareas } from "../../../api/getEmpresa";
// eslint-disable-next-line react/prop-types
const VisualizarSprintEst = ({titulo, navigateLink, bloquearFechas, verSprints}) => {
    const { idSprint, idEmpresa } = useParams(); 
    const [sprints, setSprints] = useState([]);
    const [sprintOpen, setSprintOpen] = useState([])
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); 
    useEffect(() => {
        const fetchSprintData = async () => {
            try {
                const data = await getSprintSemanas(idEmpresa===undefined? idSprint : idEmpresa); 
                console.log([data])
                setSprints([data]);
                const newOpens = [data]?.map(()=> false);
                console.log('hola')
                console.log(newOpens)
                setSprintOpen(newOpens)
                setError(null);
            } catch (err) {
                console.error('Error en la solicitud:', err);
                setError(err.message); 
            } finally {
                setLoading(false); 
            }
        };
        
    const fetchSprints = async () => {
        try {
          const data = await getSprintSemanasTareas(idEmpresa);
          setSprints(data);  
          const newOpens = data?.map(()=> false);
          console.log(newOpens)
            setSprintOpen(newOpens)
          console.log(data);
        } catch (error) {
          console.error("Error al obtener los datos:", error);
        } finally {
          setLoading(false);
        }
      };
        if(verSprints === undefined || verSprints === true) fetchSprints();
        if(verSprints === false) fetchSprintData();
    }, [idSprint]); 

    const togglePanel = (index) => {
        const newOpens = sprintOpen.map((open,i)=>{
            if(i === index){
                if(open === true) return false
                return true;
            }else{
                if(open === true) return true
                else return false
            }
            
        })
        console.log(newOpens)
        setSprintOpen(newOpens)
    };
    return (
        <Fragment>
            <BaseUI
                titulo={titulo?titulo:'VISUALIZAR SPRINT'}
                ocultarAtras={false}
                confirmarAtras={false}
                dirBack={'/'}
            >
                {loading && <p>Cargando semanas...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {sprints.map((sprint, i)=>{
                    return (
                    <div key={`${i}-${sprint.semanas[i].fechaIni}`}>
                        {(verSprints === undefined || verSprints === true)? 
                        <Box 
                            onClick={(e) =>togglePanel(i)}
                            sx={{
                                width: '92%',
                                height: 60,
                                borderRadius: 0.6,
                                margin: 0.7,
                                marginLeft: 'calc(1vw + 0.1rem)',
                                pl: 2,
                                fontSize: '1.5rem',
                                bgcolor: '#d0d4e4', 
                                textTransform: 'uppercase',
                                display: 'flex', 
                                cursor: 'pointer',
                                justifyContent: 'flex-start', 
                                alignItems: 'center', 
                                '&:hover': {
                                    bgcolor: '#c0c4d4', 
                                },
                            }}            
                        >
                            {sprintOpen[i] ? <div className='arrow-down'></div> : <div className='arrow-right'></div> }
                            SPRINT{i+1}
                        </Box>
                        :
                        <div>
                            <h1 style={{ fontSize: '2rem', display: 'flex', overflow: 'hidden', marginBottom: '0.1rem' }}>
                                SPRINT {idSprint}
                            </h1>
                        </div>
                        }
                            
                        {(!(verSprints === undefined || verSprints === true)||sprintOpen[i]) && sprint.semanas.map((semana, index) => {
                            if(bloquearFechas === true && !(new Date(semana.fechaIni) <= new Date()  && new Date() <= new Date(semana.fechaFin))) return <></>
                            return (<SprintSemanas 
                                key={index} 
                                title={`Semana ${index + 1}`} 
                                semana={semana} 
                                idSprint={idSprint} 
                                navigateLink={navigateLink}
                                semanaTexto = {bloquearFechas}
                                isOpenSprint = {(verSprints === undefined || verSprints === true)? true : sprintOpen[i]}
                            >
                            </SprintSemanas>)
                        })}
                    </div>
                    )
                })}
            </BaseUI>
        </Fragment>
    );
}

export default VisualizarSprintEst;
