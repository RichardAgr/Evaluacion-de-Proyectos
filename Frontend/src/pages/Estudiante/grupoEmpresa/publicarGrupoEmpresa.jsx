import { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BaseUI from "../../../components/baseUI/baseUI";
import { styled } from "@mui/material"; 
import { Snackbar, Alert, Grid2 } from "@mui/material";
import Box from '@mui/material/Box';
import { Button } from '@mui/material';

const PublicarGrupoEmpresa = () => {
    const { idEstudiante } = useParams();
    const [intentoEnviar, setIntentoEnviar] = useState(false);
    const [empresa, setEmpresa] = useState([]);
    const [integrantes, setIntegrantes] = useState([]);
    const [idRepresentanteLegal, setIdRepresentanteLegal] = useState(null);
    const [mensajeError, setMensajeError] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    useEffect(() => {
        const fetchInformacion = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/estudiante/getDatosEstEmpresa/${idEstudiante}`);
                if (!response.ok) throw new Error('Error al recuperar datos');
    
                const data = await response.json();
    
                const { idEmpresa, nombreEmpresa, nombreLargo, integrantes, publicada } = data;
                setEmpresa({ idEmpresa, nombreEmpresa, nombreLargo, publicada });
                setIntegrantes(integrantes);
    
                if (publicada === 1) {
                    // Si la empresa está publicada, mostrar el error 403 con el nombre de la empresa
                    setMensajeError(`La empresa "${nombreEmpresa}" ya ha sido publicada.`);
                    return; // No seguir con la carga de los datos si la empresa está publicada
                }
    
                setIdRepresentanteLegal(integrantes[0]?.idEstudiante);
    
            } catch (error) {
                console.error(error);
                setMensajeError("Error al cargar los datos.");
            }
        };


        if (idEstudiante) { 
            fetchInformacion();
        }
    }, [idEstudiante]);

    const publicarIntegrantes = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/crearGrupoEmpresa/paso3/${idEstudiante}`, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                setMensajeError(errorData.mensaje); 
                return; 
            }
    
            const result = await response.json();
            setSnackbarMessage(result.mensaje); 
            setSnackbarOpen(true); 
    
        } catch (error) {
            console.error(error);
            setMensajeError("Error al publicar la empresa.");
        }
    };
    
    


    return (
        <Fragment>
            <BaseUI
                titulo={`PUBLICAR GRUPO EMPRESA`}
                ocultarAtras={false}
                confirmarAtras={false}
                dirBack={`/`}
            >
                <div style={{ display: 'grid' }}>
                    <NombreEmpresaCompleto>
                        <Box component="section" sx={{ p: 2 }}>
                            <h3>NOMBRE LARGO:</h3>
                        </Box>
                        <t1 style={{justifyContent: "center",alignItems: "center"}}>{empresa.nombreLargo}</t1>
                    </NombreEmpresaCompleto>
                    <NombreEmpresaCompleto>
                        <Box component="section" sx={{ p: 2 }}>
                            <h3>NOMBRE CORTO:</h3>
                        </Box>
                        <t1 style={{justifyContent: "center",alignItems: "center"}}>{empresa.nombreEmpresa}</t1>
                    </NombreEmpresaCompleto>

                    <Box pt={5}>
                        <h2>Integrantes</h2>
                        <h6 style={{ color: '#979797', fontSize: '15px'}}>MAXIMO 6 - MINIMO 3</h6>
                    </Box>
                    <Grid2 item xs={12}>
                        {integrantes && integrantes.map((integrante) => (
                            <Box
                                key={integrante.idEstudiante}
                                sx={{
                                    width: "100%",
                                    height: 70,
                                    borderRadius: 1,
                                    bgcolor: '#cfd4e1',
                                    '&:hover': {
                                        bgcolor: '#BFC4D1',
                                    },
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: '12px',
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                    <h3 style={{ paddingLeft: '35px' }}>
                                        {integrante.nombreEstudiante} {integrante.primerApellido} {integrante.segundoApellido}
                                    </h3>
                                    {integrante.idEstudiante === idRepresentanteLegal && (
                                        <span style={{ color: 'black', paddingRight: '20px' }}></span>
                                    )}
                                </div>
                            </Box>
                        ))}
                    </Grid2>

                    {mensajeError && <Mensaje>{mensajeError}</Mensaje>}

                    {empresa.publicada !== 1 && (
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button  
                                variant="contained"
                                color="primary"
                                onClick={publicarIntegrantes}
                                sx={{ minWidth: 50, width: '240px', height: '30px', marginTop: '50px' }}
                            >
                                Publicar Grupo Empresa
                            </Button>
                        </div>
                    )}
                    <Snackbar 
                        open={snackbarOpen} 
                        autoHideDuration={3000} 
                        onClose={() => setSnackbarOpen(false)}
                    >
                        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
                            {snackbarMessage}
                        </Alert>
                    </Snackbar>
                </div>
            </BaseUI>
        </Fragment>
    );
};

export default PublicarGrupoEmpresa;

const NombreEmpresaCompleto = styled('div')`
    display: flex;
    box-sizing: border-box;
    align-items: center; 
    margin-top: 0.5vw;
    margin-bottom: 0.5vw;
`;

const Mensaje = styled('div')`
    color: red; 
    margin-top: 0.5vw;
    font-size: 14px;
    max-width: 300px;
`;
