import { Fragment, useState, useEffect } from "react";
import BaseUI from "../../../components/baseUI/baseUI";
import { styled } from "@mui/material"; 
import {Snackbar, Alert,Grid2 } from "@mui/material";
import Box from '@mui/material/Box';
import { Button } from '@mui/material';




const CrearGrupoEmpresa = () => {

    const [nombreLargo, setNombreLargo] = useState("");
    const [nombreCorto, setNombreCorto] = useState("");
    const [intentoEnviar, setIntentoEnviar] = useState(false);
    const [integrantes, setIntegrantes] = useState([{ id: 1, nombre: "Jhon Corrales", fijo: true }]); 
    const [mensajeError, setMensajeError] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [selectedIntegrante, setSelectedIntegrante] = useState(null); 
    const [options, setOptions] = useState([]); 
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    useEffect(() => {
        const fetchIntegrantes = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/estudiante/getEstudiante/1'); 
                if (!response.ok) throw new Error('Error al recuperar integrantes');
                const data = await response.json();
                // Asegúrate que los datos estén en el formato correcto
                const formattedOptions = data.map((integrante) => ({ id: integrante.idEstudiante, label: integrante.nombreCompleto }));
                setOptions(formattedOptions);
            } catch (error) {
                console.error(error);
                setMensajeError("Error al cargar los integrantes.");
            }
        };
        
        fetchIntegrantes(); // Llama a la función para obtener los integrantes
    }, []);

    const manejarSubmit = async () => {
        setIntentoEnviar(true);
        if (nombreLargo && nombreCorto && integrantes.length >= 1) {
            try {
                const estudiantesIds = integrantes.map(integrante => integrante.id);
                const response = await fetch('http://localhost:8000/api/estudiante/crearEmpresa', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        nombreLargo,
                        nombreCorto,
                        estudiantes: estudiantesIds,
                    }),
                });
    
                if (!response.ok) throw new Error('Error al crear el grupo');
    
                const result = await response.json();
                console.log('Grupo creado con éxito:', result);
                setSnackbarMessage("¡Grupo creado con éxito!");
                setSnackbarOpen(true);
            } catch (error) {
                console.error(error);
                setMensajeError("Error al crear el grupo.");
            }
        } else {
            if (integrantes.length < 1) {
                setMensajeError("Debe haber al menos 1 integrante para crear el grupo."); 
            }
        }
    };
    
    

    return (
        <Fragment>
            <BaseUI
                titulo={`CREAR GRUPO EMPRESA`}
                ocultarAtras={false}
                confirmarAtras={false}
                dirBack={`/`}
            >
                <div style={{ display: 'grid' }}>
                <NombreEmpresaCompleto>
                    <Box component="section" sx={{ p: 2 }}>
                        <h3>NOMBRE LARGO:</h3>
                    </Box>
                    <StyledWrapper>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <input
                                placeholder="Nombre Largo"
                                className="input"
                                value={nombreLargo}
                                onChange={(e) => setNombreLargo(e.target.value)}
                            />
                            {intentoEnviar && (
                                nombreLargo === "" 
                                ? <Alert severity="error" sx={{ ml: 1, pt: 0, pb: 0 }}>No hay nombre Largo</Alert>
                                : (nombreLargo.length < 5 || nombreLargo.length > 100) && (
                                    <Alert severity="warning" sx={{ ml: 1, pt: 0, pb: 0 }}>
                                        Debe tener entre 5 y 100 caracteres.
                                    </Alert>
                                )
                            )}
                        </div>
                    </StyledWrapper>
                </NombreEmpresaCompleto>


                    <NombreEmpresaCompleto>
                        <Box component="section" sx={{ p: 2 }}>
                            <h3>NOMBRE CORTO:</h3>
                        </Box>
                        <StyledWrapper>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <input
                                    placeholder="Nombre Corto"
                                    className="input"
                                    value={nombreCorto}
                                    onChange={(e) => setNombreCorto(e.target.value)} 
                                />
                                {intentoEnviar && (
                                    nombreLargo === "" 
                                    ? <Alert severity="error" sx={{ ml: 1, pt: 0, pb: 0 }}>No hay nombre Corto</Alert>
                                    : (nombreLargo.length < 2 || nombreLargo.length > 20) && (
                                        <Alert severity="warning" sx={{ ml: 1, pt: 0, pb: 0 }}>
                                            Debe tener entre 2 y 20 caracteres.
                                        </Alert>
                                    )
                                )}
                            </div>
                        </StyledWrapper>
                    </NombreEmpresaCompleto>
                    <Box pt={10}>
                        <h2>Integrantes</h2>
                        <h6 style={{ color: '#979797', fontSize: '15px'}}>MAXIMO 6 - MINIMO 1</h6>
                    </Box>
                    <Grid2 item xs={12}>
                        {integrantes.map((integrante, index) => (
                            <Box
                                key={integrante.id}
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
                                    <h3 style={{paddingLeft: '35px'}}>{integrante.nombre}</h3>
                                    {index === 0 && (
                                        <span style={{ color: 'black',paddingRight: '20px' }}>Representante Legal</span>
                                    )}
                                </div>
                            </Box>
                        ))}
                    </Grid2>


                    {mensajeError && <Mensaje>{mensajeError}</Mensaje>}
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button  
                        justifyContent="flex-end"
                        variant="contained"
                        color="primary"
                        onClick={manejarSubmit}
                        sx={{ minWidth: 50, width: '100px', height: '30px', marginTop:'50px' }}
                    >
                        CREAR
                    </Button>
                    </div>



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

export default CrearGrupoEmpresa;

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



const StyledWrapper = styled('div')`
  .input {
    border: 2px solid transparent;
    width: 15em;
    height: 2.5em;
    padding-left: 0.8em;
    outline: none;
    overflow: hidden;
    background-color: #cfd4e1;
    border-radius: 3px;
    transition: all 0.5s;
  }

  .input:hover,
  .input:focus {
    border: 2px solid #4A9DEC;
    background-color: white;
  }
`;