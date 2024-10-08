/* eslint-disable no-unused-vars */
import { Fragment, useState } from 'react';
import BaseUI from '../../../../components/baseUI/baseUI';
import { styled } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Avatar, FormControl, Button, TextField, IconButton } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import FolderZipIcon from '@mui/icons-material/FolderZip';
import DeleteIcon from '@mui/icons-material/Delete';

function ModificarTarea() {
  const [descripcion, setDescripcion] = useState('Descripcion...');
  const [responsables, setResponsables] = useState([
    { idEstudiante: -1, foto: null },
    { idEstudiante: -1, foto: null },
    { idEstudiante: -1, foto: null }
  ]);
  const [files, setFiles] = useState([]);
  const [descripcionError, setDescripcionError] = useState(false);
  const [filesError, setFilesError] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();

    setDescripcionError(false);
    if (descripcion === '') {
      setDescripcionError(true);
    }

    if (descripcion) {
      console.log(descripcion);
    }
  };

  const handleDeleteFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <Fragment>
      <BaseUI
        titulo={'MODIFICAR TAREA'}
        ocultarAtras={false}
        confirmarAtras={false}
        dirBack={'/'}
      >
        <ContainerdropZone>
          <form autoComplete="off" onSubmit={handleSubmit}>
            <FormControl className="formControl">
              <h1>MockUps</h1>
              <h3>Archivos:</h3>
              <div className="form_inputFiles">
                <div className="inputFiles_dropzone" onClick={() => document.querySelector(".dropzone").click()}>
                  {files.length > 0 ? (
                    <div className="uploadedFiles">
                      {files.map((file, index) => (
                        <div key={index} className="fileItem">
                          {file.type === 'application/pdf' ? (
                            <PictureAsPdfIcon style={{ fontSize: 30 }} />
                          ) : (
                            <FolderZipIcon style={{ fontSize: 30 }} />
                          )}
                          <IconButton
                            color="secondary"
                            onClick={() => handleDeleteFile(index)}
                          >
                            <DeleteIcon />
                          </IconButton>
                          <p className='fileName'>{file.name}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className='textUpload'>
                      <h3>AQUI ARRASTRA Y SUELTA ARCHIVOS</h3>
                      <div className='iconUpload'>
                        <CloudUploadIcon style={{ fontSize: 40 }}/>
                      </div>  
                    </div>              
                  )}

                  <input
                    type="file"
                    accept=".pdf,.zip,.rar,.7z"
                    hidden
                    className="dropzone"
                    onChange={({ target: { files: inputFiles } }) => {
                      const newFiles = Array.from(inputFiles).map((file) => ({
                        name: file.name,
                        type: file.type,
                        url: URL.createObjectURL(file)
                      }));
                      setFiles([...files, ...newFiles]);
                    }}
                  />
                </div>
                <div className="inputFiles_button">
                  <Button variant="contained" onClick={() => document.querySelector(".dropzone").click()}>
                    Elegir Archivo
                  </Button>
                </div>
                <div className="form_fotos">
                  {responsables.map((responsable, index) => (
                    <Avatar alt={`responsable${index}`} src={responsable.foto} key={index} />
                  ))}
                </div>
              </div>
              <h3>Descripcion Tarea:</h3>
              <div className="form_inputText">
                <StyledTextField
                  value={descripcion}
                  error={descripcionError}
                  onChange={(e) => setDescripcion(e.target.value)}
                  required
                  variant="outlined"
                  placeholder="Escribe la descripción..."
                  multiline
                />
              </div>
              <div className="form_buttons">
                <Button variant="contained" color="secondary" className="buttons">
                  No Guardar
                </Button>
                <Button variant="contained" type="submit" className="buttons">
                  Guardar
                </Button>
              </div>
            </FormControl>
          </form>
        </ContainerdropZone>
      </BaseUI>
    </Fragment>
  );
}

export default ModificarTarea;

const ContainerdropZone = styled('div')`
  margin-top: 1rem;
  margin-bottom: 1rem;
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
    justify-content: center;
    align-items: center;
    align-content: center;
    flex-grow: 1;
    border: dashed 0.2rem black;
    border-radius: 0.3rem;
    height: 20vh;
    margin-right: 0.2rem;
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
    justify-content: end;
    align-items: center;
    align-content: center;
  }
  .uploadedFiles{
    width: 95%;
    display: flex;
    align-content: center;
  }
  .fileItem{
    display: block;
  }  
  .fileName{
    width: 65px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; 
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
    &:hover fieldset {
      border-color: #999;
    }
    &.Mui-focused fieldset {
      border-color: blue;
    }
  }
`;
