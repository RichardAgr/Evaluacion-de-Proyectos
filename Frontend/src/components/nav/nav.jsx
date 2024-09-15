import {Routes, Route} from 'react-router-dom';
import Home from '../Home/home.jsx'
function nav() {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
    </Routes>
  )
}

export default nav