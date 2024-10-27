/* eslint-disable no-unused-Dvars */
import { Fragment, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { styled } from '@mui/material';

import Loading from '../../../components/loading/loading'
import Error from "../../../components/error/error";
import BaseUI from '../../../components/baseUI/baseUI';
import { getTareaData, updateTarea } from '../../../api/validarTareas/tareas';
import { getEmpresaData } from "../../../api/getEmpresa.jsx";
import DecisionButtons from '../../../components/Buttons/decisionButtons.jsx'
import CuadroDialogo from '../../../components/cuadroDialogo/cuadroDialogo.jsx';
import InfoSnackbar from '../../../components/infoSnackbar/infoSnackbar.jsx'

import { Box, FormControl, Button, TextField, IconButton, Modal, Snackbar, Typography, LinearProgress} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import FolderZipIcon from '@mui/icons-material/FolderZip';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import ImageIcon from '@mui/icons-material/Image';
import DescriptionIcon from '@mui/icons-material/Description';

function ModificarTarea() {
  const { idTarea } = useParams();
  const [responsables, setResponsables] = useState([]);
  const [responsablesError, setResponsablesError] = useState(false);
  const [files, setFiles] = useState([]);
  const [filesError, setFilesError] = useState(false);
  const [descripcion, setDescripcion] = useState('Descripcion...');
  const [descripcionError, setDescripcionError] = useState(false);
  const [listaEstu, setListaEstu] = useState([{}])
  const [titulo, setTitulo] = useState('');

  const [fileCounter, setFileCounter] = useState(0);
  const [uploadProgress, setUploadProgress] = useState({});
  const [deletedFiles, setDeletedFiles] = useState([]);
  const [deletedResponsables, setDeletedResponsables] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);  
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [error, setError] = useState({
    error: false,
    errorMessage: "",
    errorDetails: "",
  }); 
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const [cuadroDialogo, setCuadroDialogo] = useState({
    open: false,
    onConfirm: () => {},
    title: "",
    description: "",
  });

  useEffect(() => {
    const fetchTareaData = async () => {
      try {
        const [data, empresaData] = await Promise.all ([
          getTareaData(idTarea),
          getEmpresaData(1),
        ])
        setTitulo(data.nombreTarea)
        setDescripcion(data.textotarea);
        setResponsables(data.estudiantes);
        console.log(data)
        console.log(empresaData)
        const filesWithId = data.archivotarea.map((file, index) => ({
            idArchivo: file.idArchivo,
            id: `${file.nombreArchivo}-${index}`, 
            name: file.nombreArchivo,
            url: file.archivo,
        }));
        setFiles(filesWithId);
        await filtrarEstuLista(empresaData, data);
        
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
      
    };

    fetchTareaData();
  }, [idTarea]);
  
  const filtrarEstuLista =(empresaData, data)=>{
    const filteredEstudiantes = empresaData.integrantes.filter((integrante) =>
      !data.estudiantes.some(
        (responsable) => integrante.idEstudiante === responsable.idEstudiante
      )
    );
    setListaEstu(filteredEstudiantes);
  }
  const handleCloseModal = ()=>{
    setModalVisible(false)
  }
  const agregarResponsable =(index)=>{
      console.log(index);
      const estuElegido = listaEstu[index];
      console.log(estuElegido);
      const newResponsables = [...responsables, estuElegido]
      setResponsables(newResponsables);      
      setListaEstu(listaEstu.filter((_, i) => i !== index));
      setResponsablesError(newResponsables.length === 0);
  }
  const handleDeleteResponsable = (index) => {
    setListaEstu([...listaEstu, responsables[index]])
    const newResponsables = (responsables.filter((_, i) => i !== index));
    setResponsables(newResponsables);
    setDeletedResponsables([...deletedResponsables, responsables[index].idEstudiante])
    setResponsablesError(newResponsables.length === 0);
  };
  const handleChangeDescripcion = (e) =>{
    const value = e.target.value;
    setDescripcion(value);
    setDescripcionError(value.length < 20);
  }
  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const handleDrop = (event) => {
      event.preventDefault();
      const inputFiles = event.dataTransfer.files; 
      handleFileInput(inputFiles);
  };

  const handleFileInput = (inputFiles) => {
    const newFiles = Array.from(inputFiles)
      .filter((file) => {
        if (file.size > 50 * 1024 * 1024) {
          setSnackbarMessage('El archivo es demasiado grande (máx. 50 MB).');
          setSnackbarOpen(true);
          return false;
        }
        if (!['application/pdf', 'application/zip', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'].includes(file.type)) {
          setSnackbarMessage('Tipo de archivo no permitido.');
          setSnackbarOpen(true);
          return false;
        }
        if (files.length === 10) {
          setSnackbarMessage('Máximo 10 archivos');
          setSnackbarOpen(true);
          return false;
        }
        return true;
      });
  
    newFiles.forEach((file) => {
      const fileId = `${file.name}-${fileCounter}`;
      setFileCounter((prevCounter) => prevCounter + 1);
  
      // Convertir archivo a Base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result.replace(/^data:(.*?);base64,/, '');
        
        const newFile = {
          idArchivo: '-1',
          id: fileId,
          name: file.name,
          type: file.type,
          url: URL.createObjectURL(file),
          size: file.size,
          archivoBase64: base64String, // Asignar el archivo en Base64
        };
  
        // Agregar archivo convertido al estado
        setFiles((prevFiles) => [...prevFiles, newFile]);
  
        // Simular progreso de carga
        if (!snackbarOpen) {
          let progress = 0;
          const intervalDuration = 500 / Math.sqrt(file.size / (1024 * 1024));
  
          const interval = setInterval(() => {
            progress += 10;
            setUploadProgress((prevProgress) => ({
              ...prevProgress,
              [fileId]: progress,
            }));
  
            if (progress >= 100) {
              clearInterval(interval);
            }
          }, intervalDuration);
        }
      };
  
      reader.onerror = () => {
        setSnackbarMessage('Error al leer el archivo.');
        setSnackbarOpen(true);
      };
    });
  };
  
  
  const handleDeleteFile = (event, fileId, idArchivo) => {
    event.stopPropagation();//previene doble click
    setFiles((prevFiles) => {
      const newFiles = prevFiles.filter((file) => file.id !== fileId);
      return newFiles;
    });
    setDeletedFiles([...deletedFiles, idArchivo]);
    console.log([...deletedFiles, idArchivo])
    setUploadProgress((prevProgress) => {
      const updatedProgress = { ...prevProgress };
      delete updatedProgress[fileId]; 
      return updatedProgress;
    });
  };
  
  const handleCancel = () => {
    setCuadroDialogo({
      open: true,
      title: "Descartar los cambios",
      description:
        "Esta acción no se puede deshacer. Todos los cambios realizados se perderán.  ¿Está seguro?",
      onConfirm: () => window.location.reload(),
    });
  };
  const handleSave = () => {
    setCuadroDialogo({
      open: true,
      title: "Guardar los cambios",
      description:
        "Esta acción guardará todos los cambios realizados en la tarea. ¿Está seguro?",
      onConfirm: handleSubmit,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setDescripcionError(descripcion === '');
    setResponsablesError(responsables.length === 0);
  
    if (descripcionError || responsablesError) {
      return;
    }
  
    try {
      const formData = {
        idTarea,
        files,
        deletedFiles,
        responsables,
        descripcion,
      };
  
      const response = await updateTarea(idTarea, formData);
      if (response.ok) {
        setSnackbar({
          open: true,
          message: "Se subió correctamente todo",
          severity: "success",
          autoHide: true,
        });
      }
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
      setSnackbar({
        open: true,
        message: `Hubo un error al momento de subir, error: ${error}`,
        severity: "error",
        autoHide: false,
      });
    }
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const renderImg = (file) => {
    
    if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
      return <PictureAsPdfIcon style={{ fontSize: 30 }} />;
    }
    if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.name.endsWith('.docx')) {
      return <DescriptionIcon style={{ fontSize: 30 }} />;
    }
    if (file.type === 'image/png' || file.type === 'image/jpeg' || file.name.endsWith('.png') || file.name.endsWith('.jpg')) {
      return <ImageIcon style={{ fontSize: 30 }} />;
    }
    return <FolderZipIcon style={{ fontSize: 30 }} />;
  };  
  
  const downloadFile = (file) => {
    if (!file.url) {
      setSnackbarMessage('La URL del archivo no esta disponible.');
      setSnackbarOpen(true);
      return;
    }
    
  const link = document.createElement('a');
    link.href = file.url; // Usa file.archivo si es el URL real
    link.download = file.name; // Nombre con el que se descargará el archivo
    document.body.appendChild(link);
    link.click(); // Simular un clic en el enlace
    document.body.removeChild(link); // Remover el enlace temporal
  };
  
  
  if (loading) {
    return <Loading></Loading>
  }
  if(!error){
    return <Error errorMessage={error.errorMessage} errorDetails={error.errorDetails}></Error>
  }
  return (
    <Fragment>
      <BaseUI
        titulo={'MODIFICAR TAREA'}
        ocultarAtras={false}
        confirmarAtras={true}
        dirBack={'/'}
      >
        <ContainerdropZone>
          <form autoComplete="off" onSubmit={handleSubmit}>
            <FormControl className="formControl">
              <h1>{titulo}</h1>
              <h3>Responsables:</h3>
              {responsables.map((responsable, index) => (
                responsable.nombreEstudiante !== undefined ? (
                  <div className='responsables' key={index}>
                    <IconButton
                      color="secondary"
                      onClick={() => handleDeleteResponsable(index)}
                    >
                      <CancelRoundedIcon />
                    </IconButton>
                    <p>{`${responsable.nombreEstudiante} ${responsable.primerApellido} ${responsable.segundoApellido}`}</p>
                    
                  </div>    
                ) : null
              ))}
              {responsablesError? <helperText style={{ color: 'red' }}>Debe haber un responsable minimo</helperText>:<></>}
              <Button variant='contained' sx={{width:'calc(8vw + 8rem)'}} onClick={()=>setModalVisible(true)}>
                + Añadir Responsables
              </Button>
              <h3>Archivos:</h3>
              <span>{`(solo .pdf, docx, jpg, png o zip)`}</span>
              <div className="uploadedFiles">
                      {files.map((file) => (
                        <div key={file.id} className="fileItem">
                          {uploadProgress[file.id] > 0 && uploadProgress[file.id] < 100 ? (
                            <div className='fileItem__progressBar'>
                              <div style={{height:'50%'}}>
                                <Typography variant="p" color="textSecondary">
                                  Cargando archivo: {uploadProgress[file.id]}%
                                </Typography>
                                <LinearProgress variant="determinate" value={uploadProgress[file.id]} />
                              </div>                              
                            </div>
                          ) : (
                            <>
                            <IconButton
                              className='fileItem__icon'
                                color="secondary"
                                onClick={(event) => handleDeleteFile(event, file.id, file.idArchivo)}
                              >
                                <CancelRoundedIcon/>
                              </IconButton>
                              <IconButton onClick={() => downloadFile(file)}>
                                {renderImg(file)}
                              </IconButton>
                              <a onClick={() => downloadFile(file)}>{file.name}</a>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
              <div className="form_inputFiles">
                
              <div 
                className={`inputFiles_dropzone ${filesError ? 'error' : ''}`}
                onDragOver={handleDragOver} 
                onDrop={handleDrop} 
                onClick={() => document.querySelector(".dropzone").click()}
              >
                    <div className='textUpload'>
                      <h3>AQUI ARRASTRA Y SUELTA ARCHIVOS</h3>
                      <div className='iconUpload'>
                        <CloudUploadIcon style={{ fontSize: 40 }}/>
                      </div>  
                    </div>              
                  <input
                    type="file"
                    accept=".pdf, .zip, .docx, .jpg, .png"
                    hidden
                    className="dropzone"
                    onChange={({ target: { files: inputFiles } }) => handleFileInput(inputFiles)}
                  />

                </div>
                <div className="inputFiles_button">
                  <Button variant="contained" onClick={() => document.querySelector(".dropzone").click()}>
                    Elegir Archivo
                  </Button>
                </div>
                <div className="form_fotos">                  
                </div>
              </div>
              <h3>Descripcion Tarea:</h3>
              <div className="form_inputText">
                <StyledTextField
                  value={descripcion}
                  error={descripcionError}
                  onChange={(e) => handleChangeDescripcion(e)}
                  required
                  variant="outlined"
                  placeholder="Escribe una descripcion para la tarea..."
                  multiline
                  inputProps={{ maxLength: 500 }}
                  helperText = {descripcionError? 'Debe ingresar una descripción de la tarea, min 20 caracteres':<></>}
                />
              </div>
              <div className="form_buttons">
               <DecisionButtons
                  rejectButtonText="Descartar"
                  validateButtonText="Guardar cambios"
                  onReject={handleCancel}
                  onValidate={handleSave}
                />
              </div>
            </FormControl>
          </form>
          <CuadroDialogo
            open={cuadroDialogo.open}
            onClose={() => setCuadroDialogo({ ...cuadroDialogo, open: false })}
            title={cuadroDialogo.title}
            description={cuadroDialogo.description}
            onConfirm={cuadroDialogo.onConfirm}
          />
          <InfoSnackbar
            openSnackbar={snackbar.open}
            setOpenSnackbar={(open) => setSnackbar({ ...snackbar, open })}
            message={snackbar.message}
            severity={snackbar.severity}
          />          

          <Modal
            open={modalVisible}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={style}
            >
              <IconButton
                  color="secondary"
                  onClick={handleCloseModal}
                  style={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                  }}
              >
                  <CancelRoundedIcon />
              </IconButton>
              {listaEstu.map((estu, index)=>(
                <Button color='inherent' key={index} fullWidth 
                sx={{
                  justifyContent: 'flex-start',
                  width: '100%',
                  borderBottom: '1px solid #B0B0B0',
                  borderRadius: 0,
                  padding:'1rem'
                }}
                onClick={ () => agregarResponsable(index)}
                >{estu.nombreEstudiante+' '+estu.primerApellido+' '+estu.segundoApellido}</Button>
              ))}
            </Box>
          </Modal>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            message={snackbarMessage}
            action={
              <Button color="inherit" onClick={handleSnackbarClose}>
                Cerrar
              </Button>
            }
          />
        </ContainerdropZone>
      </BaseUI>
    </Fragment>
  );
}

export default ModificarTarea;
const ContainerdropZone = styled('div')`
  margin-top: 1rem;
  margin-bottom: 1rem;
  .responsables{
    display: flex;
    align-items: center;
  }
  .responsables p{
    margin-left: 0.3rem;
  }
  h3 {
    margin-top: 1rem;
  }
  .textUpload {
    display: block;
  }
  .iconUpload{
    display: flex;
    justify-content: center;
  }
  form {
    height: 100%;
  }
  .form_buttons {
    display: flex;
    justify-content: end;
  }
  .buttons {
    margin-left: 1rem;
  }
  .formControl {
    height: 100%;
    width: 100%;
  }
  .form_inputFiles {
    display: flex;
  }
  .inputFiles_dropzone {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    align-content: center;
    flex-grow: 1;  
    border: dashed 0.2rem black;
    border-radius: 0.3rem;
    margin-right: 0.2rem;
    width: 50%;
    max-width: 50%;
    min-height: 20vh;
  }
  .inputFiles_dropzone.error {
      border-color: red;
  }
  .dropZone {
    width: 100%;
    height: 100%;
  }
  .inputFiles_button {
    display: flex;
    align-items: end;
  }
  .form_fotos {
    flex-grow: 1;
    display: flex;
  }
  .uploadedFiles{
    width: 95%;
    align-content: center;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  .fileItem{
    display: flex;
    width: 95%;
    height: 5vh;
    align-content: center;
    align-items: center;
  }
  .fileItem__progressBar{
    display: flex;
    align-items: center;
    align-content: center;
    width: 20%;
    height: 100%;
  }
`;
const StyledTextField = styled(TextField)`
  width: 100%;
  padding-bottom: 1rem;
  .MuiOutlinedInput-root {
    .MuiInputBase-input {
      height: auto;
      min-height: 30vh;
      padding: 1rem;
    }
    & fieldset {
      border: 0.3rem solid #000000;
    }
  }
`;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  border: '5px solid #A629C2',
  boxShadow: 24,
  p: 4,
};