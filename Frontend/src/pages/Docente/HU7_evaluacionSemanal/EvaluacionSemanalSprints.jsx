import { Fragment, useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import BaseUI from '../../../components/baseUI/baseUI';
import { getSeguimiento } from '../../../api/seguimientoSemanal';
import { Box, Typography } from '@mui/material';
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import InfoSnackbar from '../../../components/infoSnackbar/infoSnackbar';
// eslint-disable-next-line react/prop-types
function SeguimientoSemanalSprints () {
    const navigate = useNavigate();
    const idEmpresa = localStorage.getItem("idEmpresa")
    const [sprints, setSprints] = useState([]);
    const [sprintOpen, setSprintOpen] = useState([])
    const [comentarios, setComentarios] = useState([])
    const [error, setError] = useState(false);
    const [verificacion, setVerificacion] = useState([])
    const [loading, setLoading] = useState(true); 
    const [estudiantes, setEstudiante] = useState([]);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "info",
        autoHide: 6000,
    });
    useEffect(() => {
        const fetchSprintsData = async () => {
            setLoading(true)
          try {
            const data = await getSeguimiento(idEmpresa);
            const newOpens = data?.map(()=> false);
            setSprintOpen(newOpens)
            setSprints(data);
            console.log(data)
          } catch (error) {
            console.error("Error en la solicitud:", error);
            setError(true);
          } finally {
            setLoading(false);
          }
        };
        
        const getEstudiantes = async () =>{
            setLoading(true)
            try {
                const response = await fetch(
                  `http://127.0.0.1:8000/api/empresa/${idEmpresa}`,
                  {
                    method: "GET",
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                );
            
                if (!response.ok) {
                  throw new Error("Error al obtener los datos de la empresa");
                }
            
                const data = await response.json();
                setEstudiante(data.integrantes);
                return data;
              } catch (error) {
                console.error("Error en la solicitud:", error);
                throw error;
              }finally{
                setLoading(false)
              }
        }
        
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
        getEstudiantes()
        getComentarios();
        fetchSprintsData()
    }, []); 
    useEffect(()=>{
        setLoading(true)
        if (comentarios.length > 0 && sprints.length > 0 && estudiantes.length>0) {
        let newVerificacion = []
        const tam = sprints.length
        const tamEstu = estudiantes.length
        for (let i = 0; i < tam; i++) {
            const tamSemana = (sprints[i].semanas).length;
            const semanasComentario = comentarios[i].semanas
            
            const verificacionSemanas = [];
            let bandera = false;
            for (let j = 0; j < tamSemana; j++) {
                const tam1 = tamEstu;
                const tam2 = semanasComentario[j]?.comentariosTareas?.length; 
                console.log(""+tam1+' '+tam2)
                const evaluado =  (tam1 === tam2)&& tam1!==0 && tam2!==0
                if(!evaluado){
                    bandera = true
                }
                verificacionSemanas.push(evaluado)
            }
            const a = {
                completo: !bandera,
                completoSemanas: verificacionSemanas
            }
            newVerificacion.push(a)
        }   
        setVerificacion(newVerificacion)
        setLoading(false)
      }
    },[comentarios, sprints, estudiantes ])
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
        setSprintOpen(newOpens)
    };
    const navigateSemana=(idSprint, idSemana)=>{
        localStorage.setItem("idSprint", idSprint)
        localStorage.setItem("idSemana", idSemana)
      navigate(`/homeDocente/listaEmpresasEvaluacionSemanal/empresaSprints/semana`)
    }

    if(sprints?.length === 0) return (
        <BaseUI
                titulo={'SELECCIONE UNA SEMANA PARA EL SEGUIMIENTO'}
                ocultarAtras={false}
                confirmarAtras={false}
                dirBack={`/homeDocente/listaEmpresasEvaluacionSemanal`}
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
                dirBack={`/homeDocente/listaEmpresasEvaluacionSemanal`}
                loading={loading}
                error={error}
            >
                {sprints.map((sprint, i)=>{
                    const formatoIni = (new Date(sprint.fechaIni)).toLocaleDateString();
                    const formatoFin = (new Date(sprint.fechaFin)).toLocaleDateString();
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
                                bgcolor: verificacion[i]?.completo? '#32cd32':'#d0d4e4', 
                                textTransform: 'uppercase',
                                display: 'flex', 
                                cursor: 'pointer',
                                justifyContent: 'space-between', 
                                alignItems: 'center', 
                                '&:hover': {
                                    bgcolor: verificacion[i]?.completo? '#68ba44':'#c0c5db',
                                    cursor:'pointer' 
                                },
                            }}            
                        >
                            <Box display="flex" alignItems="center">    
                                {sprintOpen[i] ? <div className='arrow-down'></div> : <div className='arrow-right'></div> }
                                <Typography sx={{ fontWeight: 'bolder' }} variant='h5'>SPRINT {i+1}</Typography>
                                <Typography sx={{ color: verificacion[i]?.completo? "black" : "red" }}>
                                    {verificacion[i]?.completo?" (YA EVALUADO)" : " (NO EVALUADO)"}
                                </Typography>
                            </Box>
                            <Box sx={{ marginRight: '', transform: 'scale(0.8)' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <CalendarTodayIcon />
                                    <Typography sx={{ fontWeight: '600' }}>INICIO DEL SPRINT: </Typography>
                                    <Typography> {formatoIni}</Typography>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <CalendarTodayIcon />
                                    <Typography sx={{ fontWeight: '600' }} variant="subtitle1">FIN DEL SPRINT: </Typography>
                                    <Typography> {formatoFin}</Typography>
                                </div>
                            </Box>
                        </Box>      
                        {sprintOpen[i]&& sprint.semanas.map((semana, index) => {
                            const formatoIni2 = (new Date(semana.fechaIni)).toLocaleDateString();
                            const formatoFin2 = (new Date(semana.fechaFin)).toLocaleDateString();
                            return <Box 
                                key={`index${index}`}
                                onClick={()=> navigateSemana(sprint.idSprint, semana.idSemana, i, index)}
                                sx={{
                                    width: '90%',
                                    height: 60,
                                    borderRadius: 0.6,
                                    margin: 0.7,
                                    marginLeft: 'calc(2vw + 0.5rem)',
                                    pl: 2,
                                    fontSize: '1.5rem',
                                    bgcolor: verificacion[i]?.completoSemanas[index]? '#32cd32':'#d0d4e4', 
                                    textTransform: 'uppercase',
                                    display: 'flex', 
                                    cursor: 'pointer',
                                    justifyContent: 'space-between', 
                                    alignItems: 'center', 
                                    '&:hover': {
                                        bgcolor: verificacion[i]?.completoSemanas[index]? '#68ba44':'#c0c5db', 
                                        cursor:'pointer'
                                    },
                                }}            
                            >
                                <Box display="flex" alignItems="center">    
                                    <Typography sx={{ fontWeight: 'bolder' }} variant='h6'>SEMANA {semana.numSemana} </Typography>
                                    <Typography sx={{ color: verificacion[i]?.completoSemanas[index]? "black" : "red" }}>
                                        {verificacion[i]?.completoSemanas[index]?" (YA EVALUADO)" : " (NO EVALUADO)"}
                                    </Typography>
                                </Box>
                                <Box sx={{ marginRight: '', transform: 'scale(0.7)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <CalendarTodayIcon />
                                        <Typography sx={{ fontWeight: '600' }}>INICIO DEL SPRINT: </Typography>
                                        <Typography> {formatoIni2}</Typography>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <CalendarTodayIcon />
                                        <Typography sx={{ fontWeight: '600' }} variant="subtitle1">FIN DEL SPRINT: </Typography>
                                        <Typography> {formatoFin2}</Typography>
                                    </div>
                                </Box>
                            </Box>
                        })}
                    </div>
                    )
                })}
                <InfoSnackbar
                    openSnackbar={snackbar.open}
                    setOpenSnackbar={(open) => setSnackbar({ ...snackbar, open })}
                    message={snackbar.message}
                    severity={snackbar.severity}
                    autoHide={snackbar.autoHide}
                />
            </BaseUI>
        </Fragment>
    );
}

export default SeguimientoSemanalSprints
