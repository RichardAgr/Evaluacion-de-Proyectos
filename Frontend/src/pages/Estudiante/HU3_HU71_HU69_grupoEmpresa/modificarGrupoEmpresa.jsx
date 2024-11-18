import { Fragment, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import BaseUI from "../../../components/baseUI/baseUI";
import { styled } from "@mui/material"; 
import { Modal, TextField, Autocomplete, Snackbar, Alert, Grid2 } from "@mui/material";
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from "@mui/icons-material/Add";

const ModificarGrupoEmpresa = () => {
    const { idEstudiante } = useParams();
    const [empresa, setEmpresa] = useState([]);
    const [integrantes, setIntegrantes] = useState([]);
    const [integrantesN, setIntegrantesN] = useState([]);
    const [idRepresentanteLegal, setIdRepresentanteLegal] = useState(null);
    const [mensajeError, setMensajeError] = useState("");
    const [error, setError] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [selectedIntegrante, setSelectedIntegrante] = useState(null); 
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [isLoading, setLoading] = useState(true);
    const navigate = useNavigate(); 

    const irInicio = () => {
        navigate('/');  // Redirige a la página de inicio
    };

    useEffect(() => {
        const fetchInformacion = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/estudiante/getDatosEstEmpresa/${idEstudiante}`);
                if (!response.ok) {
                    if (response.status === 404) {
                      setMensajeError("El estudiante no tiene empresa y no tiene registrada ninguna");
                    } else {
                      setMensajeError('Error al recuperar datos');
                    }
                    throw new Error('Error al recuperar datos');
                  }
                const data = await response.json();
    
                const { idEmpresa, nombreEmpresa, nombreLargo, integrantes, publicada } = data;
                setEmpresa({ idEmpresa, nombreEmpresa, nombreLargo, publicada });
                setIntegrantes(integrantes);
                if (publicada === 1) {
                    // Si la empresa está publicada, mostrar el error 403 con el nombre de la empresa
                    setMensajeError(`La empresa "${nombreEmpresa}" ya ha sido publicada.`);
                    setError(true)
                    return; // No seguir con la carga de los datos si la empresa está publicada
                }
    
                setIdRepresentanteLegal(integrantes[0]?.idEstudiante);
    
            } catch (error) {
                console.error(error);
                setMensajeError("Error al cargar los datos.");
                setError(true)
            }finally{
                setLoading(false);
            }
        };

        const fetchNuevosEstudiantes = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/estudiante/getDisponibles/${idEstudiante}`);
                if (!response.ok) throw new Error('Error al recuperar datos');
    
                const data = await response.json();
                setIntegrantesN(data);
            } catch (error) {
                console.error(error);
                setError(true)
                setMensajeError("Error al cargar los datos.");
            }
        };

        if (!idEstudiante) return; 
        fetchInformacion();
        fetchNuevosEstudiantes();
    }, [idEstudiante]);

    const actualizarIntegrantes = async () => {
        if (integrantes.length < 3) {
            setMensajeError("Debe haber al menos 3 integrantes.");
            return;
        }

        try {
            const estudiantesIds = integrantes.map(integrante => integrante.idEstudiante);
            const response = await fetch(`http://localhost:8000/api/crearGrupoEmpresa/paso2/${empresa.idEmpresa}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ integrantes: estudiantesIds }),
            });
            setTimeout(() => {
                irInicio();
            }, 2000); 

            if (!response.ok) {
                throw new Error('Error al actualizar los integrantes');
            }

            const result = await response.json();
            setSnackbarMessage(result.mensaje); 
            setSnackbarOpen(true);

        } catch (error) {
            console.error(error);
            setMensajeError("Error al actualizar los integrantes.");
        }
    };

    const agregarIntegrante = () => {
        if (integrantes.length < 6) {
            setOpenModal(true); 
        } else {
            setError(true)
        }
    };

    const confirmarAgregarIntegrante = () => {
        if (selectedIntegrante) {
            const existe = integrantes.some(integrante => integrante.idEstudiante === selectedIntegrante.idEstudiante);
            if (existe) {
                setMensajeError("Este integrante ya ha sido agregado.");
                setError(true)
                return;
            }

            const nuevoIntegrante = { 
                idEstudiante: selectedIntegrante.idEstudiante, 
                nombreEstudiante: `${selectedIntegrante.nombreEstudiante} ${selectedIntegrante.primerApellido} ${selectedIntegrante.segundoApellido}`,
                fijo: false 
            };

            setIntegrantes([...integrantes, nuevoIntegrante]);

            const nuevasOpciones = integrantesN.filter(option => option.idEstudiante !== selectedIntegrante.idEstudiante);
            setIntegrantesN(nuevasOpciones);

            setSelectedIntegrante(null);
            setOpenModal(false);

            setSnackbarMessage("Integrante agregado correctamente.");
            setSnackbarOpen(true);
        } else {
            setMensajeError("Debe seleccionar un integrante.");
        }
    };

    const eliminarIntegrante = (idEstudiante) => {
        const integranteAEliminar = integrantes.find(integrante => integrante.idEstudiante === idEstudiante);
        
        if (integranteAEliminar) {
            setIntegrantes(integrantes.filter(integrante => integrante.idEstudiante !== idEstudiante));
            
            const nuevaListaIntegrantesN = [...integrantesN, integranteAEliminar];
            
            nuevaListaIntegrantesN.sort((a, b) => {
                const nombreA = `${a.nombreEstudiante} ${a.primerApellido} ${a.segundoApellido}`;
                const nombreB = `${b.nombreEstudiante} ${b.primerApellido} ${b.segundoApellido}`;
                return nombreA.localeCompare(nombreB);
            });
            
            setIntegrantesN(nuevaListaIntegrantesN);
    
            setSnackbarMessage("Integrante restaurado correctamente.");
            setSnackbarOpen(true);
        }
    };
    


    return (
        <Fragment>
            <BaseUI
                titulo={`MODIFICAR GRUPO EMPRESA`}
                ocultarAtras={false}
                confirmarAtras={false}
                dirBack={`/`}
                loading={isLoading}
                error={mensajeError}
            >

                {isLoading !== true && (
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
                                {!integrante.fijo && integrante.idEstudiante !== idRepresentanteLegal && empresa.publicada !== 1 && (
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        startIcon={<DeleteIcon />}
                                        onClick={() => eliminarIntegrante(integrante.idEstudiante)}
                                        sx={{ mr: 2 }}
                                    >
                                        Eliminar
                                    </Button>
                                )}
                            </Box>
                        ))}
                    </Grid2>

                    {mensajeError && <Mensaje>{mensajeError}</Mensaje>}

                    {/* Solo renderizar el botón de añadir si la empresa no está publicada */}
                    {empresa.publicada !== 1 && (
                        <Button 
                            variant="contained"
                            color="primary"
                            startIcon={<AddIcon />}
                            sx={{ minWidth: 50, width: '240px', height: '30px' }}
                            onClick={agregarIntegrante}
                        >
                            Añadir Integrante
                        </Button>
                    )}

                    {/* Solo renderizar el botón de publicar si la empresa no está publicada */}
                    {empresa.publicada !== 1 && (
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button  
                                variant="contained"
                                color="secondary"
                                onClick={irInicio}
                                sx={{ minWidth: 50, width: '100px', height: '30px', marginTop: '50px',mr:5 }}
                            >
                                Descartar
                            </Button>
                            <Button  
                                variant="contained"
                                color="primary"
                                onClick={actualizarIntegrantes}
                                sx={{ minWidth: 50, width: '200px', height: '30px', marginTop: '50px' }}
                            >
                                Guardar Cambios
                            </Button>
                        </div>
                    )}

                    <Modal open={openModal} onClose={() => setOpenModal(false)}>
                        <div style={{ padding: "20px", backgroundColor: "white", margin: "auto", marginTop: "20%", width: "300px", borderRadius: "8px" }}>
                            <h2>Añadir Integrante</h2>
                            <Autocomplete
                                options={integrantesN}
                                getOptionLabel={(option) => `${option.nombreEstudiante} ${option.primerApellido} ${option.segundoApellido}`}
                                onChange={(event, newValue) => setSelectedIntegrante(newValue)}
                                renderInput={(params) => (
                                    <TextField {...params} label="Selecciona un integrante" />
                                )}
                            />
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={confirmarAgregarIntegrante}
                                >
                                    Añadir
                                </Button>
                                <Button variant="outlined" onClick={() => setOpenModal(false)}>
                                    Cancelar
                                </Button>
                            </div>
                        </div>
                    </Modal>

                    <Snackbar 
                        open={snackbarOpen} 
                        autoHideDuration={3000} 
                        onClose={() => setSnackbarOpen(false)}
                    >
                        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
                            {snackbarMessage}
                        </Alert>
                    </Snackbar>
                </div>)}
            </BaseUI>
        </Fragment>
    );
};

export default ModificarGrupoEmpresa;

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
