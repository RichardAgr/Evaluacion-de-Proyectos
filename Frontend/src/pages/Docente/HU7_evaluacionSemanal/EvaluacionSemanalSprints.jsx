import { Fragment, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BaseUI from '../../../components/baseUI/baseUI';
import { getSeguimiento } from '../../../api/seguimientoSemanal';
import { Box } from '@mui/material';
// eslint-disable-next-line react/prop-types
function SeguimientoSemanalSprints () {
    const navigate = useNavigate();
    const { idEmpresa, idGrupo } = useParams(); 
    const [sprints, setSprints] = useState([]);
    const [sprintOpen, setSprintOpen] = useState([])
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true); 
    useEffect(() => {
        const fetchSprintsData = async () => {
          try {
            const data = await getSeguimiento(idEmpresa);
            const newOpens = data?.map(()=> false);
            setSprintOpen(newOpens)
            console.log(newOpens)
            setSprints(data);
            console.log(data)
          } catch (error) {
            console.error("Error en la solicitud:", error);
            setError(true);
          } finally {
            setLoading(false);
          }
        };
        fetchSprintsData()
    }, []); 

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
    const navigateSemana=(idSprint, idSemana)=>{
      navigate(`/homeGrupo/${idGrupo}/listaEmpresas/evaluacionSemanal/${idEmpresa}/Sprint/${idSprint}/semana/${idSemana}`)
    }
    return (
        <Fragment>
            <BaseUI
                titulo={'SELECCIONE UNA SEMANA PARA EL SEGUIMIENTO'}
                ocultarAtras={false}
                confirmarAtras={false}
                dirBack={`/homeGrupo/${idGrupo}/listaEmpresas/evaluacionSemanal`}
                loading={loading}
                error={error}
            >
                {sprints.map((sprint, i)=>{
                    return (
                    <div key={i}>
                        <Box 
                            onClick={() =>togglePanel(i)}
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
                            SPRINT {i+1}
                        </Box>      
                        {sprintOpen[i]&& sprint.semanas.map((semana, index) => (
                            <Box 
                                key={`index${index}`}
                                onClick={()=> navigateSemana(sprint.idSprint, semana.idSemana)}
                                sx={{
                                    width: '90%',
                                    height: 60,
                                    borderRadius: 0.6,
                                    margin: 0.7,
                                    marginLeft: 'calc(2vw + 0.5rem)',
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
                                SEMANA {semana.numSemana}
                            </Box>
                          ))
                        }
                    </div>
                    )
                })}
            </BaseUI>
        </Fragment>
    );
}

export default SeguimientoSemanalSprints
