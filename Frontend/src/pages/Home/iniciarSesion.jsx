import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    Divider,
  } from "@mui/material";
  import { Formik, Field, Form } from "formik";
  import * as Yup from "yup";
  import myImage from '../../assets/img/inicio.jpg';
  
  function IniciarSesion() {
    const login = async (nombreCuenta, contrasena) => {
        console.log(nombreCuenta)
        console.log(contrasena)
      try {
        const response = await fetch('http://localhost:8000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
             nombreCuenta: nombreCuenta,
             contrasena: contrasena
            }
            ),
            credentials: 'include',
        });
  
        if (!response.ok) {
          throw new Error('Error en el inicio de sesión');
        }
  
        const data = await response.json();
        //localStorage.setItem('token', data.token);
        //console.log(data);
        localStorage.setItem('role', data.role);
        //window.location.reload();
        console.log(data.role);
      } catch (error) {
        console.error('Error en el inicio de sesión:', error);
      }
    };
  
    const validationSchema = Yup.object({
      nombreCuenta: Yup.string().required('El nombre de la cuenta es obligatorio'),
      contrasena: Yup.string().required('La contraseña es obligatoria'),
    });
  
    return (
      <Container
        sx={{
          margin: '0',
          display: "flex",
          minHeight: "100vh",
          minWidth: '100VW',
          alignItems: "center",
          justifyContent: "center",
          background: 'linear-gradient(to right, #0074E5, #009DE4);'
        }}
      >
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            width: "60vw",
            maxWidth: "100vw",
            borderRadius: "12px",
            overflow: "hidden",
            minHeight: "60vh",
          }}
        >
          <Box
            sx={{
              flex: 1,
              backgroundImage: `url(${myImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              color: "#fff",
              padding: "40px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              border: 'solid white 1rem',
              borderRadius: '1.5rem',
            }}
          >
            <Typography variant="h3" sx={{ fontWeight: "bold" }}>
              WEB TIS
            </Typography>
          </Box>
  
          {/* Sección del Formulario */}
          <Box sx={{ flex: 1, padding: "40px" }}>
            <Typography variant="h4" gutterBottom sx={{ marginTop: '2rem', marginBottom: '2rem', fontWeight: 'bold' }}>
              BIENVENIDO
            </Typography>
            <Divider sx={{ marginBottom: "20px" }} />
  
            <Formik
              initialValues={{ nombreCuenta: "", contrasena: "" }}
              validationSchema={validationSchema}
              onSubmit={(values) => login(values.nombreCuenta, values.contrasena)}
            >
              {({ touched, errors, handleChange, handleBlur, values }) => (
                <Form>
                  <Typography sx={{ fontWeight: 'medium' }}>Nombre de la cuenta</Typography>
                  <Field
                    name="nombreCuenta"
                    placeholder="Nombre de la cuenta"
                    variant="outlined"
                    fullWidth
                    as={TextField}
                    sx={{ marginBottom: "20px" }}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.nombreCuenta}
                    error={touched.nombreCuenta && Boolean(errors.nombreCuenta)}
                    helperText={touched.nombreCuenta && errors.nombreCuenta ? errors.nombreCuenta : " "} // Espacio en blanco para evitar cambios de tamaño
                  />
  
                  <Typography sx={{ fontWeight: 'medium' }}>Contraseña</Typography>
                  <Field
                    name="contrasena"
                    placeholder="Contraseña"
                    type="password"
                    variant="outlined"
                    fullWidth
                    as={TextField}
                    sx={{ marginBottom: "20px" }}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.contrasena}
                    error={touched.contrasena && Boolean(errors.contrasena)}
                    helperText={touched.contrasena && errors.contrasena ? errors.contrasena : " "} // Espacio en blanco para evitar cambios de tamaño
                  />
  
                  <Typography variant="body2" color="primary" sx={{ cursor: "pointer", marginBottom: "20px" }}>
                    olvidaste tu contraseña?
                  </Typography>
  
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    Iniciar Sesion
                  </Button>
                </Form>
              )}
            </Formik>
  
            <Typography variant="body2" align="center" sx={{ marginTop: "20px" }}>
              No tienes cuenta? <span style={{ color: "blue", cursor: "pointer" }}>Crear Cuenta</span>
            </Typography>
          </Box>
        </Paper>
      </Container>
    );
  }
  
  export default IniciarSesion;
  