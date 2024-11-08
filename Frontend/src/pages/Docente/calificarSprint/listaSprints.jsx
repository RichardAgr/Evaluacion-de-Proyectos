import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import BaseUI from '../../../components/baseUI/baseUI';
import Loading from '../../../components/loading/loading'
import Error from "../../../components/error/error";
import { getSprintsEntregables } from "../../../api/getEmpresa"
/* eslint-disable react/prop-types */

const ListaSprints = () => {
    const navigate = useNavigate();
    const [sprints, setSprints] = useState([
    ])
    const { idEmpresa } = useParams();
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
        console.log("click", sprint)
        navigate(`/${idEmpresa}/calificarSprints/sprint/${sprint}`); 
    }
    if (loading) {
        return <Loading></Loading>
    }
    if(!error){
        return <Error errorMessage={error.errorMessage} errorDetails={error.errorDetails}></Error>
    }    
    return (
        <BaseUI        
            titulo={'SELECCIONE UN SPRINT PARA CALIFICAR'}
            ocultarAtras={false}
            confirmarAtras={false}
            dirBack={`/`}
        >
        <DivLista>
            {sprints!==null? 
                <>
                    {sprints.map((sprint, index)=>(
                    <Box 
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
                    ))}
                </>
                :
                <>No se encontro ningun sprint en la base de datos</>
            }
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