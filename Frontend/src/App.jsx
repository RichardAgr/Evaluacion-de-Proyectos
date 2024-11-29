import Nav from './routes/nav';
import NavDocente from './routes/navDocente';
import NavEstudiante from './routes/navEstudiante';
//import NavAdministrador from './routes/navAdministrador'; // Nuevo componente para administrador
import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';
import './App.css';

function App() {
  const userRole = Cookies.get('random');

  function decrypt(encryptedValue) {
    const ENCRYPTION_KEY = 'mi_clave_super_segura';
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedValue, ENCRYPTION_KEY);
      const decryptedValue = bytes.toString(CryptoJS.enc.Utf8);
      return decryptedValue;
    } catch (error) {
      console.error('Error al desencriptar el valor', error);
      return null;
    }
  }

  if (userRole) {
    const decryptedRole = decrypt(userRole);

    // Validar el rol del usuario
    if (decryptedRole === 'docente') {
      return <NavDocente />;
    }
    if (decryptedRole === 'estudiante') {
      return <NavEstudiante />;
    }
    if (decryptedRole === 'administrador') { // Caso para administrador
      return <NavAdministrador />;
    }
  }

  // Redirigir a la pantalla de inicio de sesión si no hay rol válido
  return <Nav />;
}

export default App;
