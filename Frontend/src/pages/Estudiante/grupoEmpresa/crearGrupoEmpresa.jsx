import { Fragment, useState, useEffect } from "react";
import BaseUI from "../../../components/baseUI/baseUI";
import { styled } from "@mui/material"; 
import { Modal, Button, TextField, Autocomplete,Snackbar, Alert } from "@mui/material";

const CrearGrupoEmpresa = () => {

    const [nombreLargo, setNombreLargo] = useState("");
    const [nombreCorto, setNombreCorto] = useState("");
    const [intentoEnviar, setIntentoEnviar] = useState(false);
    const [integrantes, setIntegrantes] = useState([{ id: 1, nombre: "Jhon Corrales", fijo: true }]); // El estudiante hardcodeado con id=1
    const [mensajeError, setMensajeError] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [selectedIntegrante, setSelectedIntegrante] = useState(null); 
    const [options, setOptions] = useState([]); 
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    useEffect(() => {
        // Función para obtener los integrantes desde la API
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
        if (nombreLargo && nombreCorto && integrantes.length >= 3) {
            try {
                const estudiantesIds = integrantes.map(integrante => integrante.id); // Obtener los IDs de los integrantes
                const response = await fetch('http://localhost:8000/api/estudiante/crearEmpresa', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        nombreLargo,
                        nombreCorto,
                        estudiantes: estudiantesIds, // Incluir los IDs de los estudiantes
                    }),
                });
    
                if (!response.ok) throw new Error('Error al crear el grupo');
    
                const result = await response.json();
                console.log('Grupo creado con éxito:', result);
                setSnackbarMessage("¡Grupo creado con éxito!");
                setSnackbarOpen(true); // Mostrar el snackbar

            } catch (error) {
                console.error(error);
                setMensajeError("Error al crear el grupo.");
            }
        } else {
            if (integrantes.length < 3) {
                setMensajeError("Debe haber al menos 3 integrantes para crear el grupo."); 
            } 
            // Agrega aquí otras validaciones según sea necesario
        }
    };
    
    

    const agregarIntegrante = () => {
        if (integrantes.length < 6) {
            setOpenModal(true); 
        } else {
            setMensajeError("No puedes agregar más de 6 integrantes.");
        }
    };

    const confirmarAgregarIntegrante = () => {
        if (selectedIntegrante) {
            // Verifica si el integrante ya está en la lista
            const existe = integrantes.some(integrante => integrante.id === selectedIntegrante.id);
            if (existe) {
                setMensajeError("Este integrante ya ha sido agregado.");
                return;
            }
    
            // Agregar el integrante al grupo
            const nuevoIntegrante = { id: selectedIntegrante.id, nombre: selectedIntegrante.label, fijo: false };
            setIntegrantes([...integrantes, nuevoIntegrante]);
    
            // Eliminar el integrante seleccionado de las opciones disponibles
            const nuevasOpciones = options.filter(option => option.id !== selectedIntegrante.id);
            setOptions(nuevasOpciones); 
    
            // Limpiar la selección y cerrar el modal
            setSelectedIntegrante(null);
            setOpenModal(false);
        } else {
            setMensajeError("Debe seleccionar un integrante.");
        }
    };
    

    const eliminarIntegrante = (id) => {
        setIntegrantes(integrantes.filter(integrante => integrante.id !== id));
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
                        <h3>NOMBRE LARGO:</h3>
                        <InputCentro
                            placeholder="Nombre Largo"
                            value={nombreLargo}
                            onChange={(e) => setNombreLargo(e.target.value)}
                        />
                            {intentoEnviar && (
                            nombreLargo === "" 
                            ? <Mensaje>No hay nombre largo</Mensaje>
                            : nombreLargo.length < 5
                            ? <Mensaje>debe tener un mínimo de 5 caracteres y un máximo de 100 caracteres.</Mensaje>
                            : null
                        )} 
                    </NombreEmpresaCompleto>

                    <NombreEmpresaCompleto>
                        <h3>NOMBRE CORTO:</h3>
                        <InputCentro 
                            placeholder="Nombre Corto"
                            value={nombreCorto}
                            onChange={(e) => setNombreCorto(e.target.value)} 
                        />
                            {intentoEnviar && (
                            nombreCorto === "" 
                            ? <Mensaje>No hay nombre largo</Mensaje>
                            : nombreCorto.length < 2
                            ? <Mensaje>debe tener un mínimo de 5 caracteres y un máximo de 100 caracteres.</Mensaje>
                            : null
                        )} 
                    </NombreEmpresaCompleto>
                    
                    <div>
                        <h2 style={{marginTop: '6vw'}}>Integrantes</h2>
                        <h6 style={{ color: '#979797', fontSize: '1.5vw', padding: '0.4vw'}}>MAXIMO 6 - MINIMO 3</h6>
                    </div>

                    {integrantes.map((integrante, index) => (
                        <Integrante key={integrante.id}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', padding: '10px' }}>
                                <h3>{integrante.nombre}</h3>
                                {index === 0 && (
                                    <span style={{ color: 'black' }}>Representante Legal</span>
                                )}
                            </div>
                            {!integrante.fijo && (
                                <BotonAzul onClick={() => eliminarIntegrante(integrante.id)}>
                                    Eliminar
                                </BotonAzul>
                            )}
                        </Integrante>
                    ))}

                    {mensajeError && <Mensaje>{mensajeError}</Mensaje>}

                    <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '1vw' }}>
                        <BotonRojo onClick={agregarIntegrante}>+ Añadir Integrante</BotonRojo>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <BotonRojo onClick={manejarSubmit}>PUBLICAR GRUPO EMPRESA</BotonRojo>

                    </div>

                    {/* Modal para agregar integrante */}
                    <Modal open={openModal} onClose={() => setOpenModal(false)}>
                        <div style={{ padding: "20px", backgroundColor: "white", margin: "auto", marginTop: "20%", width: "300px", borderRadius: "8px" }}>
                            <h2>Añadir Integrante</h2>
                            <Autocomplete
                                options={options} // Usar las opciones recuperadas
                                getOptionLabel={(option) => option.label}
                                onChange={(event, newValue) => setSelectedIntegrante(newValue)}
                                renderInput={(params) => (
                                    <TextField {...params} label="Selecciona un integrante" />
                                )}
                            />
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                                <Button variant="contained" color="primary" onClick={confirmarAgregarIntegrante}>
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
    margin-top: 1vw;
    margin-bottom: 1vw;
`;

const InputCentro = styled('input')`
    box-sizing: border-box;
    justify-content: center;
    width: 221px;
    height: 34px;
    background-color: #d0d4e4; 
    border: none;
    margin-left: 10px;
    margin-right: 10px;
`;

const Mensaje = styled('div')`
    color: red; 
    margin-top: 0.5vw;
    font-size: 14px;
    max-width: 300px;
`;

const BotonAzul = styled('button')`
    margin-left: auto;
    background-color: #114093; 
    color: white; 
    width: 122px;
    height: 28px;
    border: none;
    cursor: pointer;
    border-radius: 0.3vw;
`;

const BotonRojo = styled('button')`
    background-color: #e30613; 
    color: white; 
    width: 25%;
    height: 3vw;
    border: none;
    padding: 0.7vw; 
    cursor: pointer;
    margin-top: 1vw;
    margin-bottom: 1vw;
    border-radius: 0.3vw;
`;

const Integrante = styled('div')`
    display: flex;
    justify-content: space-between; 
    align-items: center; 
    background-color: #d6dbe5; 
    padding: 10px;
    margin-bottom: 10px;
`;
