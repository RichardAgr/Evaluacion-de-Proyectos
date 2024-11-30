import { Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
function HomeAdmin() {
  const navigate = useNavigate()
  return (
      <Box display='flex' height={'100vh'} width={'100vw'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <h1>HOLA ADMIN</h1>
        <div>
          <Button variant='contained' onClick={()=>navigate('/crearCuentaEstudiante')}>
            Crear cuenta docente
          </Button>
        </div>
      </Box>
  );
}

export default HomeAdmin;   