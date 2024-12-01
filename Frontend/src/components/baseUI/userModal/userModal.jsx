import {
  Modal,
  Box,
  Avatar,
  Typography,
  Button,
  TextField,
  IconButton
} from "@mui/material";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { obtenerDatosDocente, obtenerDatosEstudiante, updatePerfil } from "../../../api/obtenerDatosParaModal";

// eslint-disable-next-line react/prop-types
const UserProfileModal = ({ openPerfil, cerrarPerfil, role }) => {
  const nombreCompleto = localStorage.getItem("nombreCompleto");

  const [editar, setEditar] = useState(false);
  const [initialValues, setInitialValues] = useState({
    nombreCuenta: "",
    contrasena: "",
    correo: "",
    nombre: "",
    apellido: "",
    segundoApellido: "",
    verificarSiEsElUsuario: ""
  });

  const getDatosEstu = async () => {
    try {
      const datos = await obtenerDatosEstudiante();
      setInitialValues({
        ...datos,
        verificarSiEsElUsuario: "",
        contrasena: "",
        repetirContrasena: ""
      });
      console.log(datos)
    } catch (error) {
      console.error("Error al obtener datos del estudiante:", error);
    }
  };

  const getDatosDoc = async () => {
    try {
      const datos = await obtenerDatosDocente();
      setInitialValues({
        ...datos,
        verificarSiEsElUsuario: "",
        contrasena: "",
        repetirContrasena: ""
      });
    } catch (error) {
      console.error("Error al obtener datos del docente:", error);
    }
  };

  useEffect(() => {
    if (role === "docente") {
      getDatosDoc();
    } else {
      getDatosEstu();
    }
  }, [role]);


  const validationSchema = Yup.object({
    nombre: Yup.string().trim().required("El nombre es obligatorio"),
    apellido: Yup.string().trim().required("El apellido paterno es obligatorio"),
    segundoApellido: Yup.string().trim().required("El apellido materno es obligatorio"),
    correo: Yup.string()
      .email("El correo no tiene un formato válido")
      .required("El correo es obligatorio"),
    nombreCuenta: Yup.string().trim().required("El nombre de la cuenta es obligatorio"),
    contrasena: Yup.string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .matches(/[A-Z]/, "La contraseña debe tener al menos una letra mayúscula")
      .matches(/[0-9]/, "La contraseña debe tener al menos un número")
      .required("La contraseña es obligatoria"),
    repetirContrasena: Yup.string()
      .oneOf([Yup.ref("contrasena"), null], "Las contraseñas no coinciden")
      .required("Debe confirmar su contraseña"),
    verificarSiEsElUsuario: Yup.string()
      .required("Debe confirmar su contraseña actual"),
  });

  const handleSubmit = async (values) => {
    try {
      const response = await updatePerfil(values);

      if (response.ok) {
        alert(response.message);
        console.log("Datos enviados:", values);
        setEditar(false);
      } else {
        alert("Contraseña es incorrecta");
      }
    } catch (error) {
      console.error("Error en la verificación de contraseña:", error);
    }
  };

  return (
    <Modal open={openPerfil} onClose={() => { cerrarPerfil(false); setEditar(false); }}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxHeight: "99vh",
          width: "calc(10vw + 15rem)",
          bgcolor: "white",
          boxShadow: 24,
          borderRadius: "16px",
          overflowX: "hidden",
          overflowY: "auto",
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#114093',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'white',
          }
        }}
      >
        <Box
          sx={{
            backgroundColor: "#114093",
            color: "white",
            textAlign: "center",
            padding: "16px",
            borderRadius: "16px 16px 0 0",
          }}
        >
          <Avatar
            src={AccountCircleIcon}
            sx={{
              width: 80,
              height: 80,
              margin: "0 auto",
              border: "2px solid white",
            }}
          />
          <Typography variant="h6" sx={{ marginTop: "8px" }}>
            {nombreCompleto}
          </Typography>
          <Typography variant="body2">{role.toUpperCase()}</Typography>
        </Box>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, errors, touched, resetForm }) => (
            <Form>
              <Box display={"flex"} alignContent={"center"} justifyContent={"center"}>
                <Box sx={{ margin: "2rem", marginBottom: "0.5rem" }}>
                  <Typography variant="h6">Datos cuenta:</Typography>
                  <TextField
                    name="nombreCuenta"
                    disabled={!editar}
                    sx={{ marginTop: "8px" }}
                    value={values.nombreCuenta}
                    onChange={handleChange}
                    error={touched.nombreCuenta && Boolean(errors.nombreCuenta)}
                    helperText={touched.nombreCuenta && errors.nombreCuenta}
                    label="Nombre Cuenta"
                    fullWidth
                  />
                  <Box display={"flex"} sx={{ marginTop: "10px" }}>
                    <TextField
                      name="contrasena"
                      disabled={!editar}
                      sx={{ marginRight: "0.1rem" }}
                      value={values.contrasena}
                      onChange={handleChange}
                      error={touched.contrasena && Boolean(errors.contrasena)}
                      helperText={touched.contrasena && errors.contrasena}
                      label="Nueva Contraseña"
                      fullWidth
                      type="password"
                    />
                    <TextField
                      name="repetirContrasena"
                      disabled={!editar}
                      sx={{ marginLeft: "0.1rem" }}
                      value={values.repetirContrasena}
                      onChange={handleChange}
                      error={touched.repetirContrasena && Boolean(errors.repetirContrasena)}
                      helperText={touched.repetirContrasena && errors.repetirContrasena}
                      label="Repetir Contraseña"
                      fullWidth
                      type="password"
                    />
                  </Box>
                  <TextField
                    name="correo"
                    disabled={!editar}
                    sx={{ marginTop: "10px" }}
                    value={values.correo}
                    onChange={handleChange}
                    error={touched.correo && Boolean(errors.correo)}
                    helperText={touched.correo && errors.correo}
                    label="Correo"
                    fullWidth
                  />
                  <TextField
                    name="nombre"
                    disabled={!editar}
                    sx={{ marginTop: "10px" }}
                    value={values.nombre}
                    onChange={handleChange}
                    error={touched.nombre && Boolean(errors.nombre)}
                    helperText={touched.nombre && errors.nombre}
                    label="Nombre"
                    fullWidth
                  />
                  <Box display={"flex"} sx={{ marginTop: "10px" }}>
                    <TextField
                      name="apellido"
                      disabled={!editar}
                      sx={{ marginRight: "0.1rem" }}
                      value={values.apellido}
                      onChange={handleChange}
                      error={touched.apellido && Boolean(errors.apellido)}
                      helperText={touched.apellido && errors.apellido}
                      label="Apellido"
                    />
                    <TextField
                      name="segundoApellido"
                      disabled={!editar}
                      sx={{ marginLeft: "0.1rem" }}
                      value={values.segundoApellido}
                      onChange={handleChange}
                      error={touched.segundoApellido && Boolean(errors.segundoApellido)}
                      helperText={touched.segundoApellido && errors.segundoApellido}
                      label="Segundo Apellido"
                    />
                  </Box>
                  <TextField
                    name="verificarSiEsElUsuario"
                    disabled={!editar}
                    sx={{ marginTop: "1rem" }}
                    value={values.verificarSiEsElUsuario}
                    onChange={handleChange}
                    error={touched.verificarSiEsElUsuario && Boolean(errors.verificarSiEsElUsuario)}
                    helperText={touched.verificarSiEsElUsuario && errors.verificarSiEsElUsuario}
                    label="Contraseña Actual"
                    fullWidth
                    type="password"
                  />
                </Box>
              </Box>
              <Box margin={"2rem"} marginTop={"0.5rem"} marginBottom={"1rem"}>
                <Box display={"flex"} justifyContent={"flex-end"}>
                  {!editar ? (
                    <IconButton
                      variant="contained"
                      sx={{
                        backgroundColor: "#114093",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "#003289",
                        },
                      }}
                      onClick={() => setEditar(true)}
                    >
                      <EditNoteRoundedIcon />
                    </IconButton>
                  ) : (
                    <Box display={"flex"} sx={{ width: "100%" }}>
                      <Button type="submit" variant="contained" sx={{ flexGrow: "1" }}>
                        Confirmar
                      </Button>
                      <Button
                        variant="outlined"
                        sx={{ flexGrow: "1", marginLeft: "0.2rem" }}
                        onClick={() => {
                          setEditar(false); 
                          resetForm();
                        }}
                      >
                        Cancelar
                      </Button>
                    </Box>
                  )}
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default UserProfileModal;
