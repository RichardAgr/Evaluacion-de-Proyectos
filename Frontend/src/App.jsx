import Nav from './routes/nav'
import NavDocente from './routes/navDocente'
import NavEstudiante from './routes/navEstudiante'
import './App.css'
import { useState } from 'react'
function App() {
  const [loginEst, setLoginEst] = useState(true);
  const [loginDoc, setLoginDoc] = useState(true);
  const [loginAdmind, setLoginAdmind] = useState(true);
  return (
    <>
      {loginAdmind&&loginDoc&&loginEst&&<Nav/>}
      {loginDoc&&<NavDocente/>}
      {loginEst&&<NavEstudiante/>}
    </>
  )
}

export default App
