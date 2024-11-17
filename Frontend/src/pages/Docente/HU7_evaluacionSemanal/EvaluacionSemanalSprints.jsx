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
      if(comentarios.length>0 && sprints.length>0){
        console.log(comentarios)
        console.log(sprints)
        let newVerificacion = []
        const tam = sprints.length
        for (let i = 0; i < tam; i++) {
            const tamSemana = (sprints[i].semanas).length;
            const semanasSprint = sprints[i].semanas
            const semanasComentario = comentarios[i].semanas
            let verificacionSemanas = [];
            let bandera = false
            for (let j = 0; j < tamSemana; j++) {
                const evaluado = semanasSprint[j].tareasEstudiante.length === semanasComentario[j].comentariosTareas.length;
                console.log(evaluado)
                if(!evaluado){
                    bandera = true
                }
                verificacionSemanas.push(evaluado)
            }
            if(bandera){
                newVerificacion.push(
                    {
                        completo: !bandera,
                        completoSemanas: verificacionSemanas
                    }
                )
            }

        }
        setVerificacion(newVerificacion)
        console.log(newVerificacion)        
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
                            SPRINT {i+1} {verificacion[i]?.completo?'(YA EVALUADO)':''}
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
