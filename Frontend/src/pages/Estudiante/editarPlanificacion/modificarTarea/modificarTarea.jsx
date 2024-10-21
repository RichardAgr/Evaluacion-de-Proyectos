import { Fragment, useState, useEffect } from "react";
import BaseUI from "../../../../components/baseUI/baseUI";
import { styled } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Avatar,
  FormControl,
  Button,
  TextField,
  IconButton,
  Alert,
  AlertTitle,
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import FolderZipIcon from "@mui/icons-material/FolderZip";
import ImageIcon from "@mui/icons-material/Image"; // Ícono para imágenes
import TextSnippetIcon from "@mui/icons-material/TextSnippet"; // Ícono para archivos de texto
import DeleteIcon from "@mui/icons-material/Delete";
import {
  getTareaData,
  updateTarea,
} from "../../../../api/validarTareas/tareas";
import PopUpDialog from "../../../../components/popUPDialog/popUpDialog";
import { useParams, useNavigate } from "react-router-dom";

function ModificarTarea() {
  const [descripcion, setDescripcion] = useState("");
  const [deletedFiles, setDeletedFiles] = useState([]);
  const [responsables, setResponsables] = useState([]);
  const [existingFiles, setExistingFiles] = useState([]); // Archivos ya existentes en la tarea
  const [newFiles, setNewFiles] = useState([]); // Archivos nuevos subidos
  const [descripcionError, setDescripcionError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [alertInfo, setAlertInfo] = useState(null);
  const { idTarea } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTareaData = async () => {
      try {
        const data = await getTareaData(idTarea);
        setDescripcion(data.textotarea);
        setResponsables(data.estudiantes);
        setExistingFiles(
          data.archivotarea.map((file) => ({
            name: file.nombreArchivo,
            url: file.archivo,
          }))
        );
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar la tarea:", error);
        setLoading(false);
      }
    };

    fetchTareaData();
  }, [idTarea]);

  const handleGuardar = async () => {
    try {
      const formData = new FormData();
      formData.append("textotarea", descripcion);

      // Agregar archivos nuevos
      newFiles.forEach((file) => {
        formData.append("archivotarea[]", file); // Archivos recién subidos
      });

      // Agregar archivos eliminados si es necesario
      if (deletedFiles.length > 0) {
        deletedFiles.forEach((file) => {
          formData.append("archivosEliminados[]", file.name);
        });
      }

      await updateTarea(idTarea, formData);

      setAlertInfo({
        type: "success",
        message: "Tarea guardada correctamente.",
      });
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
      setAlertInfo({
        type: "error",
        message: "Hubo un error al guardar la tarea.",
      });
    } finally {
      setOpenDialog(false);
    }
  };

  const handleValidarCampos = () => {
    if (!descripcion) {
      setDescripcionError(true);
      setAlertInfo({
        type: "warning",
        message: "La descripción no debe estar vacía.",
      });
    } else if (newFiles.length === 0 && existingFiles.length === 0) {
      setAlertInfo({
        type: "warning",
        message: "Debes subir al menos un archivo.",
      });
    } else {
      setOpenDialog(true);
    }
  };

  const handleCloseAlert = () => {
    setAlertInfo(null);
  };

  const handleCancel = () => {
    setOpenCancelDialog(true);
  };

  const handleConfirmCancel = () => {
    navigate(`/ruta-a-la-pagina-anterior`);
  };

  const handleDeleteFile = (index, isNewFile = false) => {
    if (isNewFile) {
      setNewFiles(newFiles.filter((_, i) => i !== index));
    } else {
      const fileToDelete = existingFiles[index];
      setDeletedFiles([...deletedFiles, fileToDelete]);
      setExistingFiles(existingFiles.filter((_, i) => i !== index));
    }
  };

  const handleFileChange = (e) => {
    const inputFiles = e.target.files;
    setNewFiles([...newFiles, ...inputFiles]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setNewFiles([...newFiles, ...droppedFiles]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const renderIconForFileType = (fileName) => {
    if (!fileName || typeof fileName !== "string") {
      return <TextSnippetIcon style={{ fontSize: 30 }} />; // Ícono por defecto si el nombre de archivo es indefinido
    }
    if (fileName.endsWith(".pdf")) {
      return <PictureAsPdfIcon style={{ fontSize: 30 }} />;
    }
    if (fileName.endsWith(".zip") || fileName.endsWith(".rar")) {
      return <FolderZipIcon style={{ fontSize: 30 }} />;
    }
    if (
      fileName.endsWith(".png") ||
      fileName.endsWith(".jpg") ||
      fileName.endsWith(".jpeg")
    ) {
      return <ImageIcon style={{ fontSize: 30 }} />;
    }
    if (
      fileName.endsWith(".txt") ||
      fileName.endsWith(".doc") ||
      fileName.endsWith(".docx") ||
      fileName.endsWith(".xls") ||
      fileName.endsWith(".xlsx")
    ) {
      return <TextSnippetIcon style={{ fontSize: 30 }} />;
    }
    return <TextSnippetIcon style={{ fontSize: 30 }} />; // Ícono por defecto para otros tipos
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <Fragment>
      <BaseUI
        titulo={"MODIFICAR TAREA"}
        ocultarAtras={false}
        confirmarAtras={false}
        dirBack={"/"}
      >
        <ContainerdropZone>
          <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
            <FormControl className="formControl">
              <h1>MockUps</h1>
              <h3>Archivos Existentes:</h3>
              <div className="uploadedFiles">
                {existingFiles.length > 0 ? (
                  existingFiles.map((file, index) => (
                    <div key={index} className="fileItem">
                      {renderIconForFileType(file.name)}
                      <IconButton
                        color="secondary"
                        onClick={() => handleDeleteFile(index, false)}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <p className="fileName">
                          {file?.name || "Nombre desconocido"}
                        </p>
                      </a>
                    </div>
                  ))
                ) : (
                  <p>No hay archivos existentes</p>
                )}
              </div>

              <h3>Archivos Nuevos:</h3>
              <div
                className="inputFiles_dropzone"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <div className="textUpload">
                  <h3>Aquí arrastra y suelta archivos</h3>
                  <div className="iconUpload">
                    <CloudUploadIcon style={{ fontSize: 40 }} />
                  </div>
                </div>
                <input
                  type="file"
                  accept=".txt,.png,.jpg,.jpeg,.pdf,.zip,.rar,.doc,.docx,.xls,.xlsx"
                  multiple
                  hidden
                  className="dropzone"
                  onChange={handleFileChange}
                />
              </div>
              <div className="inputFiles_button_right">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => document.querySelector(".dropzone").click()}
                >
                  Elegir Archivo
                </Button>
              </div>

              <div className="uploadedFiles">
                {newFiles.length > 0 ? (
                  newFiles.map((file, index) => (
                    <div key={index} className="fileItem">
                      {renderIconForFileType(file.name)}
                      <IconButton
                        color="secondary"
                        onClick={() => handleDeleteFile(index, true)}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <p className="fileName">{file.name || "Archivo nuevo"}</p>
                    </div>
                  ))
                ) : (
                  <p>No hay archivos nuevos</p>
                )}
              </div>

              <h3>Descripción Tarea:</h3>
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

              <NotaYBotonesSection>
                <BotonesSection>
                  <Button
                    variant="contained"
                    color="secondary"
                    className="btn-cancelar"
                    onClick={handleCancel}
                  >
                    No Guardar
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleValidarCampos}
                  >
                    Guardar
                  </Button>
                </BotonesSection>
              </NotaYBotonesSection>

              <PopUpDialog
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
                titleDialog="Confirmación"
                textDialog="¿Estás seguro de guardar los cambios?"
                especial={handleGuardar}
              />

              <PopUpDialog
                openDialog={openCancelDialog}
                setOpenDialog={setOpenCancelDialog}
                especial={() => window.location.reload()}
                titleDialog={
                  "¿Estás seguro de que quieres descartar los cambios?"
                }
                textDialog={
                  "Esta acción no se puede deshacer. Todos los cambios realizados se perderán."
                }
              />

              {alertInfo && (
                <Alert severity={alertInfo.type} onClose={handleCloseAlert}>
                  <AlertTitle>
                    {alertInfo.type === "success" ? "Éxito" : "Error"}
                  </AlertTitle>
                  {alertInfo.message}
                </Alert>
              )}
            </FormControl>
          </form>
        </ContainerdropZone>
      </BaseUI>
    </Fragment>
  );
}

export default ModificarTarea;

const ContainerdropZone = styled("div")`
  margin-top: 1rem;
  margin-bottom: 1rem;
  h3 {
    margin-top: 1rem;
  }
  .textUpload {
    display: block;
  }
  .iconUpload {
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
  .inputFiles_button_right {
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
  }
  .uploadedFiles {
    width: 95%;
    display: flex;
    align-content: center;
  }
  .fileItem {
    display: block;
  }
  .fileName {
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

const NotaYBotonesSection = styled("div")`
  display: flex;
  justify-content: flex-end; /* Alinear los botones a la derecha */
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const BotonesSection = styled("div")`
  display: flex;
  gap: 1rem;
`;
