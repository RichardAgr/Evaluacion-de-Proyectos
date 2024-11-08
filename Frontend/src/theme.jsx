// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#114093',
    },
    secondary: {
      main: '#E30613',
    },
  },
  typography: {
    fontFamily: [
      'Montserrat',
      'Roboto, Arial, sans-serif'
    ].join(','),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        textPrimary: {
          color: '#ffff', // Color del texto en botones de tipo texto
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: '#ffffff', // Fondo de la AppBar en blanco
          color: '#000000', // Color del texto en negro
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: '#000000', // Texto del MenuItem en negro
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#fffff', // Texto en negro en general
        },
      },
    },
  },
});

export default theme;
