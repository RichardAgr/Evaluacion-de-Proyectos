import Nav from './routes/nav'
import NavDocente from './routes/navDocente'
import NavEstudiante from './routes/navEstudiante'
import NavAdmin from './routes/navAdmin'
import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';
import './App.css'

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
    if (decryptedRole === 'docente') {
      return <NavDocente />;
    }
    if (decryptedRole === 'estudiante') {
      return <NavEstudiante />;
    }
    if (decryptedRole === 'administrador') {
      return <NavAdmin />;
    }
  }
  return <Nav />;
}

export default App;
