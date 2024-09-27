import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles'; // Importa el ThemeProvider
import App from './App.jsx';
import './index.css';
import theme from './theme'; // Importa tu archivo de tema

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}> {/* Envuelve tu aplicación con ThemeProvider */}
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
