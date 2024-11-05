import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import BaseUI from '../../../components/baseUI/baseUI';
import Loading from '../../../components/loading/loading'
import Error from "../../../components/error/error";
/* eslint-disable react/prop-types */

const ListaSprints = () => {
    const navigate = useNavigate();
    const [sprints, setSprints] = useState([
        {idSprint: 1, numeroSprint:1},
        {idSprint: 2, numeroSprint:2}
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
                //setSprints()
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
            {sprints?.map((sprint, index)=>(
                <Box 
                    key={index}
                    onClick={() => clickBoton(sprint.idSprint)}
                    sx={{
                        width: '80%', height: 60,
                        borderRadius: 0.6, margin: 0.7,
                        marginLeft: 7, pl: 2,
                        textAlign: 'center',
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
                    <div className='arrow-right'></div>
                    Sprint {sprint.numeroSprint}
                </Box>
            ))}
        </DivLista>
        </BaseUI>
    );
};


const DivLista = styled("div")`
    display: flex;
    flex-direction: column;
    margin: 0rem;
    .arrow-right { 
        width: 0; 
        height: 0;
        border-top: 10px solid transparent; 
        border-bottom: 10px solid transparent; 
        border-left: 10px solid black; 
        margin-right: 0.5rem;
    }   

`;

export default ListaSprints;