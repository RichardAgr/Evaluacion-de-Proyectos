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
        containedPrimary: {
          backgroundColor: '#E30613', // Color del botón primario
          '&:hover': {
            backgroundColor: '#c50512', // Color cuando está en hover
          },
        },
        containedSecondary: {
          backgroundColor: '#114093', // Color del botón secundario
          '&:hover': {
            backgroundColor: '#0e316d', // Color cuando está en hover
          },
        },
        outlinedPrimary: {
          borderColor: '#E30613',
          color : '#E30613', // Color del borde para los botones outline
        },
        textPrimary: {
          color: '#000000', // Color del texto en botones de tipo texto
        },
      },
    },
  },
});

export default theme;
