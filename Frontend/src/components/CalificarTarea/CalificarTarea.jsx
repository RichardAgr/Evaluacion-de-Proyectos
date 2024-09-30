import { useState, useEffect } from 'react';
import { styled } from '@mui/material';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getTareaData, calificarTarea } from '../../api/validarTareas/tareas';

const CalificarTarea = ({ idTarea }) => {
  const [tarea, setTarea] = useState(null);
  const [nota, setNota] = useState(50); // Nota por defecto de 50
  const [comentario, setComentario] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTareaData = async () => {
      try {
        const data = await getTareaData(idTarea);
        setTarea(data);
        setNota(50); // Valor por defecto para la nota
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
      alert('Calificación guardada correctamente.');
    } catch (error) {
      console.error('Error al guardar la calificación', error);
      alert('Hubo un error al guardar la calificación');
    }
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
            minRows={6}  // Aumentar el número de filas
            style={{ minHeight: '150px' }}
          />
        </ComentarioDocente>

        <NotaYBotonesSection>
          <NotaSection>
            <h3>NOTA:</h3>
            <StyledTextField
              type="number"
              value={nota}
              onChange={(e) => setNota(e.target.value)}
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
            <Button variant="contained" color="primary" onClick={handleGuardar}>
              Guardar
            </Button>
          </BotonesSection>
        </NotaYBotonesSection>
      </ContentWrapper>
    </Container>
  );
};

export default CalificarTarea;


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
  border: 2px solid black; /* Cuadro alrededor de los archivos */
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
