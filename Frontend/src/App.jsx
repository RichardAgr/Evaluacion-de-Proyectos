import Nav from './routes/nav'
import NavDocente from './routes/navDocente'
import NavEstudiante from './routes/navEstudiante'
import './App.css'
function App() {
  const userRole = localStorage.getItem('role');
  

  if(userRole==='docente'){ 
    return(
      <NavDocente/>
    )
  }
  if(userRole==='docente'){ 
    return(
      <NavEstudiante/>
    )
  }
  return (
      <Nav/>
  )
}

export default App
