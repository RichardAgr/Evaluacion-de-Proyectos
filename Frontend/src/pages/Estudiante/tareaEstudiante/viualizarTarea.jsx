import { useParams} from "react-router-dom";
import { Fragment,useEffect,useState } from 'react';
import { styled } from '@mui/material';
import BaseUI from '../../../components/baseUI/baseUI';
import {getTareaData} from "../../../api/validarTareas/tareas";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import FolderZipIcon from "@mui/icons-material/FolderZip";
import ImageIcon from "@mui/icons-material/Image"; // Ícono para imágenes
import TextSnippetIcon from "@mui/icons-material/TextSnippet"; // Ícono para archivos de texto

function VisualizarTarea() {
    const [descripcion, setDescripcion] = useState("");
    const [comentarioD, setComentario] = useState("");
    const [responsables, setResponsables] = useState([]);
    const [existingFiles, setExistingFiles] = useState([]); 
    const { idTarea } = useParams();
    const { idSprint } = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchTareaData = async () => {
        try {
          const data = await getTareaData(idTarea);
          setDescripcion(data.textotarea);
          setComentario(data.comentario);
          setResponsables(data.estudiantes);
          setExistingFiles(
            data.archivotarea.map((file) => ({
              name: file.nombreArchivo,
              url: file.archivo,
            })),
            console.log(data.textotarea),
          );
          setLoading(false);
        } catch (error) {
          console.error("Error al cargar la tarea:", error);
          setLoading(false);
        }
      };
  
      fetchTareaData();
    }, [idTarea]);
  
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

    return (
        <Fragment>
          <BaseUI
            titulo = {'VISUALIZAR TAREA'}
            ocultarAtras = {false}
            confirmarAtras = {false}
            dirBack = {`/homeEstudiante/homeGrupoEstudiante/sprint/${idSprint}`}
          >
            <div>
              <div><h1>Nombre Tarea (Falta base datos implementacion)</h1></div>
              <DescripcionTarea>
                <h4>Responsables</h4>
                <Responsables>
                  {responsables.length > 0 ? (
                    responsables.map((responsable, index) => (
                      <p key={index}>
                        {responsable.nombreEstudiante} {responsable.primerApellido} {responsable.segundoApellido}
                      </p>
                    ))
                  ) : (
                    <p>No hay responsables asignados</p>
                  )}
                </Responsables>
              </DescripcionTarea>
              <ArchivosSection>
                <h3>Archivos:</h3>
                <ArchivosWrapper>
                  <div className="uploadedFiles">
                    {existingFiles.length > 0 ? (
                      existingFiles.map((file, index) => (
                        <div key={index} className="fileItem">
                          {renderIconForFileType(file.name)}
                          <a
                            href={file.url}  // URL al archivo
                            target="_blank"   // Abrir en una nueva pestaña
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
                </ArchivosWrapper>
              </ArchivosSection>
            </div>
            <h3>Descripcion de la tarea</h3>
            <Rectangulo>{descripcion}</Rectangulo>

            {comentarioD && ( // Condición para mostrar el comentario solo si existe
              <>
                <h3>Comentario del Docente</h3>
                <Rectangulo>{comentarioD}</Rectangulo>
              </>
            )}
          </BaseUI> 
        </Fragment>
    );
}

export default VisualizarTarea;

const DescripcionTarea = styled('div')`
  margin-top: 1rem;
`;

const ArchivosSection = styled('div')`
  margin-top: 1rem;
`;

const ArchivosWrapper = styled('div')`
  box-sizing: border-box;
  padding: 1rem;
  min-height: 6vw;
  border-radius: 0.1rem;
  width: 80%;
  .archivos-icons {
    display: flex;
    gap: 1rem;
  }
  .archivo-ejemplo {
    width: 50px;
    height: 50px;
  }
`;

const Responsables = styled('div')`
    box-sizing: border-box;
    width: 50%;
    padding: 1vw;
    min-height: 20px;
    width: 40;
    padding-bottom: 10px;
`;

const Rectangulo = styled('div')`
    box-sizing: border-box;
    width: 100%;        
    padding: 2.5vw;     
    min-height: 200px;  
    padding-bottom: 20px; 
    border: 4px solid #000000;  
    margin: 20px auto;
`;