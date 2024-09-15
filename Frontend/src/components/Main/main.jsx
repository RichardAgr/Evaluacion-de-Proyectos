import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from '../Home/home.jsx'
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <Home ></Home>
        </BrowserRouter>
    </React.StrictMode>
)