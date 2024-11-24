import { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import BaseUI from '../../../components/baseUI/baseUI';
import { getSprintsEntregables } from "../../../api/getEmpresa"
/* eslint-disable react/prop-types */

const ListaSprints = () => {
    const navigate = useNavigate();
    const [sprints, setSprints] = useState([
    ])
    const idEmpresa = localStorage.getItem("idEmpresa")
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState({
        error: false,
        errorMessage: "",
        errorDetails: "",
    });
   
    useEffect(()=>{
        const fetchSprints = async ()=>{
            try {
                const [sprintData] = await Promise.all ([
                    getSprintsEntregables(idEmpresa),
                ])
                console.log(sprintData.sprints)
                setSprints(sprintData.sprints)
                console.log(sprintData.sprints[0].fechaFin)
            } catch (error) {
                setError({
                    error: true,
                    errorMessage: "Ha ocurrido un error",
                    errorDetails: error.message,
                });
                console.error("Error al cargar la tarea:", error);
            }finally {
                setLoading(false);
            }
        }
        fetchSprints();
    },[])
    const clickBoton = (sprint) => {
        localStorage.setItem("idSprint", sprint)
        navigate(`/homeDocente/listaEmpresaCalificarSprints/empresa/sprint`); 
    }

    if(sprints?.length === 0 || new Date(sprints[0]?.fechaFin) > new Date()) return (
        <BaseUI
                titulo={'SELECCIONE UN SPRINT PARA CALIFICAR'}
                ocultarAtras={false}
                confirmarAtras={false}
                dirBack={`/homeDocente/listaEmpresaCalificarSprints`}
                loading={loading}
                error={error}
        >
            <div className='mensajeVacio'>
               <h1>{sprints?.length === 0?
                'ESTA EMPRESA NO TIENE SPRINTS' 
                : 
                'EL PRIMER SPRINT DE ESTE GRUPO NO TERMINO TODAIVA, NO SE PUEDE CALIFICAR'
               }</h1>
            </div>
        </BaseUI>
    )

    return (
        <BaseUI        
            titulo={'SELECCIONE UN SPRINT PARA CALIFICAR'}
            ocultarAtras={false}
            confirmarAtras={false}
            dirBack={`/homeDocente/listaEmpresaCalificarSprints`}
            loading={loading}
            error={error}
        >
        <DivLista>
            {sprints.map((sprint, index)=>(
                ( new Date() > new Date(sprint.fechaFin)?<Box 
                    key={index}
                    onClick={() => clickBoton(sprint.idSprint)}
                    sx={{
                        width: '85%', height: 60,
                        borderRadius: 0.6, margin: 0.7,
                        marginLeft: 'calc(2vw + 1rem)', pl: 2,
                        fontSize: '1.5rem',
                        bgcolor: sprint.nota === null ? '#d0d4e4' : '#32cd32',
                        textTransform: 'uppercase',
                        display: 'flex', 
                        cursor: 'pointer',
                        justifyContent: 'flex-start', 
                        alignItems: 'center', 
                        '&:hover': {
                            bgcolor: sprint.nota === null ? '#c0c4d4' : '#68ba44',
                        },
                    }}            
                >
                    Sprint {sprint.numeroSprint}{sprint.nota === null ? "":"(YA EVALUADO)"}
                </Box>
                :
                    <></>
                )
            ))}
    
        </DivLista>
        </BaseUI>
    );
};


const DivLista = styled("div")`
    display: flex;
    flex-direction: column;
    margin: 0rem;
`;

export default ListaSprints;