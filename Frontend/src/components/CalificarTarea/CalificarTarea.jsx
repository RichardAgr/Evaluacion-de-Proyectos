import { useState, useEffect } from 'react';
import { styled } from '@mui/material';
import { Button, TextField, Alert, AlertTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getTareaData, calificarTarea } from '../../api/validarTareas/tareas';
import PopUpDialog from '../popUPDialog/popUpDialog'; // Importar el componente PopUpDialog

const CalificarTarea = ({ idTarea }) => {
  const [tarea, setTarea] = useState(null);
  const [nota, setNota] = useState(0);
  const [comentario, setComentario] = useState('');
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false); // Controla el diálogo
  const [alertInfo, setAlertInfo] = useState(null); // Controla las alertas
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTareaData = async () => {
      try {
        const data = await getTareaData(idTarea);
        setTarea(data);
        setNota(data.notatarea || 50); // Si no hay nota, coloca 50 como predeterminado
        setComentario(data.comentario);
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar la tarea:', error);
        setLoading(false);
      }
    };

    fetchTareaData();
  }, [idTarea]);

  const handleGuardar = async () => {
    try {
      await calificarTarea(idTarea, nota, comentario);
      setAlertInfo({ type: 'success', message: 'Calificación guardada correctamente.' });
    } catch (error) {
      console.error('Error al guardar la calificación', error);
      setAlertInfo({ type: 'error', message: 'Hubo un error al guardar la calificación.' });
    } finally {
      setOpenDialog(false); // Asegurarse de cerrar el diálogo después de guardar
    }
  };

  const handleValidarCampos = () => {
    // Validar que ninguno de los campos esté vacío
    if (!nota || !comentario) {
      setAlertInfo({ type: 'warning', message: 'Ninguno de los campos debe estar vacío' });
    } else {
      setOpenDialog(true); // Abrir diálogo si los campos están completos
    }
  };

  const handleCloseAlert = () => {
    setAlertInfo(null); // Cerrar alerta después de mostrarla
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!tarea) {
    return <div>No hay datos disponibles para esta tarea.</div>;
  }

  return (
    <Container>
      <Button className="btn-atras" onClick={() => navigate(-1)}>Atrás</Button>
      <h2>CALIFICAR TAREA</h2>

      <ContentWrapper>
        <h1>MockUps</h1>

        <ArchivosYEstudiantesSection>
          <ArchivosSection>
            <h3>Archivos:</h3>
            <ArchivosWrapper>
              <div className="archivos-icons">
                {tarea.archivotarea && tarea.archivotarea.length > 0 ? (
                  tarea.archivotarea.map((archivo) => (
                    <a key={archivo.idArchivo} href={archivo.archivo} download>
                      <img src="/icono-archivo.png" alt="Archivo" />
                    </a>
                  ))
                ) : (
                  <>
                    <img src="/icono-pdf.png" alt="PDF" className="archivo-ejemplo" />
                    <img src="/icono-img.png" alt="Imagen" className="archivo-ejemplo" />
                    <img src="/icono-rar.png" alt="RAR" className="archivo-ejemplo" />
                  </>
                )}
              </div>
            </ArchivosWrapper>
          </ArchivosSection>

          <EstudiantesSection>
            <h3>Estudiantes:</h3>
            <div className="fotos-estudiantes">
              {tarea.estudiantes && tarea.estudiantes.length > 0 ? (
                tarea.estudiantes.map((estudiante) => (
                  <EstudianteFoto key={estudiante.id} src={estudiante.foto || '/icono-usuario.png'} alt={`Foto de ${estudiante.nombre}`} />
                ))
              ) : (
                <>
                  <EstudianteFoto src="/icono-usuario.png" alt="Usuario" />
                  <EstudianteFoto src="/icono-usuario.png" alt="Usuario" />
                </>
              )}
            </div>
          </EstudiantesSection>
        </ArchivosYEstudiantesSection>

        <DescripcionTarea>
          <h3>Descripción de la tarea:</h3>
          <p>{tarea.textotarea}</p>
        </DescripcionTarea>

        <ComentarioDocente>
          <h3>Comentario Docente:</h3>
          <StyledTextField
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            placeholder="Comentarios del docente"
            multiline
            minRows={6}
            style={{ minHeight: '150px' }}
          />
        </ComentarioDocente>

        <NotaYBotonesSection>
          <NotaSection>
            <h3>NOTA:</h3>
            <StyledTextField
              type="number"
              value={nota}
              onChange={(e) => {
                const valorNota = Math.max(0, Math.min(100, Number(e.target.value)));
                setNota(valorNota);
              }}
              min="0"
              max="100"
              placeholder="Escribe la nota..."
              style={{ width: '80px' }}
            />
          </NotaSection>
          <BotonesSection>
            <Button variant="contained" color="secondary" className="btn-cancelar">
              No Guardar
            </Button>
            <Button variant="contained" color="primary" onClick={handleValidarCampos}>
              Guardar
            </Button>
          </BotonesSection>
        </NotaYBotonesSection>

        {/* Componente de PopUpDialog */}
        <PopUpDialog
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          titleDialog="Confirmación"
          textDialog="¿Estás seguro de guardar la calificación?"
          especial={handleGuardar}
        />

        {/* Mensaje de Alerta */}
        {alertInfo && (
          <Alert severity={alertInfo.type} onClose={handleCloseAlert}>
            <AlertTitle>{alertInfo.type === 'success' ? 'Éxito' : 'Error'}</AlertTitle>
            {alertInfo.message}
          </Alert>
        )}
      </ContentWrapper>

    </Container>
  );
};

export default CalificarTarea;

// Estilos
const Container = styled('div')`
  margin: 0 5rem;
  h2, h1 {
    text-align: left; // Alineación a la izquierda
  }
  .btn-atras {
    background-color: red;
    color: white;
    margin-bottom: 1rem;
    margin-top: 1rem;
  }
`;

const ContentWrapper = styled('div')`
  border: 3px solid black; 
  padding: 5rem;
`;

const ArchivosYEstudiantesSection = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const ArchivosSection = styled('div')`
  margin-top: 1rem;
`;

const ArchivosWrapper = styled('div')`
  border: 2px solid black;
  padding: 1rem;
  .archivos-icons {
    display: flex;
    gap: 1rem;
  }
  .archivo-ejemplo {
    width: 50px;
    height: 50px;
  }
`;

const EstudiantesSection = styled('div')`
  margin-top: 1rem;
  .fotos-estudiantes {
    display: flex;
    gap: 1rem;
  }
`;

const EstudianteFoto = styled('img')`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const DescripcionTarea = styled('div')`
  margin-top: 1rem;
`;

const NotaYBotonesSection = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const NotaSection = styled('div')`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const BotonesSection = styled('div')`
  display: flex;
  gap: 1rem;
`;

const ComentarioDocente = styled('div')`
  margin-top: 1rem;
`;

const StyledTextField = styled(TextField)`
  width: 100%;
  margin-top: 1rem;
  .MuiOutlinedInput-root {
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
