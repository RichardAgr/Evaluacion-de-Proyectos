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
    const [comentarios, setComentarios] = useState([])
    const [error, setError] = useState(false);
    const [verificacion, setVerificacion] = useState([])
    const [loading, setLoading] = useState(true); 
    useEffect(() => {
        const fetchSprintsData = async () => {
            setLoading(true)
          try {
            const data = await getSeguimiento(idEmpresa);
            const newOpens = data?.map(()=> false);
            setSprintOpen(newOpens)
            setSprints(data);
          } catch (error) {
            console.error("Error en la solicitud:", error);
            setError(true);
          } finally {
            setLoading(false);
          }
        };
        
        const getComentarios = async () => {
            setLoading(true)
            try {
                const response = await fetch(`http://localhost:8000/api/seguimientoSemanal/${idEmpresa}/SprintHastaSemanalActualComentarios`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const responseData = await response.json();
                setComentarios(responseData)
                if (!response.ok) throw new Error('Error al obtener los datos de los comentarios');
            } catch (error) {
                console.error('Error en la solicitud:', error);
                setError(true);
            }finally{
            setLoading(false)
            }
      };
        getComentarios();
        fetchSprintsData()
    }, []); 
    useEffect(()=>{
        setLoading(true)
        if (comentarios.length > 0 && sprints.length > 0 && comentarios.length === sprints.length) {
        let newVerificacion = []
        const tam = sprints.length
        for (let i = 0; i < tam; i++) {
            const tamSemana = (sprints[i].semanas).length;
            const semanasSprint = sprints[i].semanas
            const semanasComentario = comentarios[i].semanas
            console.log(semanasSprint)
            console.log(semanasComentario)
            const verificacionSemanas = [];
            let bandera = false
            for (let j = 0; j < tamSemana; j++) {
                const tam1 = semanasSprint[j]?.tareasEstudiante?.length;
                const tam2 = semanasComentario[j]?.comentariosTareas?.length; 
                console.log(""+tam1+' '+tam2)
                const evaluado =  (tam1 === tam2)&& tam1!==0 && tam2!==0
                if(!evaluado){
                    bandera = true
                }
                verificacionSemanas.push(evaluado)
            }
            console.log(verificacionSemanas)
        
            const a = {
                completo: !bandera,
                completoSemanas: verificacionSemanas
            }
            newVerificacion.push(a)
        }
        console.log(newVerificacion)
        setVerificacion(newVerificacion)
        setLoading(false)
      }
    },[comentarios, sprints ])
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
      navigate(`/homeEstudiante/visCalificar/${idEmpresa}/sprint/${idSprint}/Semana/${idSemana}`)
    }

    if(sprints?.length === 0) return (
        <BaseUI
                titulo={'SELECCIONE UNA SEMANA PARA EL SEGUIMIENTO'}
                ocultarAtras={false}
                confirmarAtras={false}
                dirBack={`/homeEstudiante/visCalificar`}
                loading={loading}
                error={error}
        >
            <div className='mensajeVacio'>
               <h1>NO HAY SEMANAS PARA EVALUAR</h1>
            </div>
        </BaseUI>
    )

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
                                bgcolor: verificacion[i]?.completo? 'green':'#d0d4e4', 
                                textTransform: 'uppercase',
                                display: 'flex', 
                                cursor: 'pointer',
                                justifyContent: 'flex-start', 
                                alignItems: 'center', 
                                '&:hover': {
                                    bgcolor: verificacion[i]?.completo? '#006700':'#c0c5db',
                                    cursor:'pointer' 
                                },
                            }}            
                        >
                            {sprintOpen[i] ? <div className='arrow-down'></div> : <div className='arrow-right'></div> }
                            SPRINT {i+1} {verificacion[i]?.completo?'(YA EVALURON ESTE SPRINT, CLICK PARA VER)':''}
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
                                    bgcolor: verificacion[i]?.completoSemanas[index]? 'green':'#d0d4e4', 
                                    textTransform: 'uppercase',
                                    display: 'flex', 
                                    cursor: 'pointer',
                                    justifyContent: 'flex-start', 
                                    alignItems: 'center', 
                                    '&:hover': {
                                        bgcolor: verificacion[i]?.completoSemanas[index]? '#006700':'#c0c5db', 
                                        cursor:'pointer'
                                    },
                                }}            
                            >
                                SEMANA {semana.numSemana} {verificacion[i]?.completoSemanas[index]?'(YA EVALURON ESTE SPRINT, CLICK PARA VER)':''}
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
