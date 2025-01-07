import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Alert,
  Select,
  MenuItem,
  Grid,
  InputLabel,
  FormControl,
} from "@mui/material";

const RegisterForm = ({ functionPost, setOpen }) => {
  const [error, setError] = useState(null);
  // Formulario de registro
  const [formData, setFormData] = useState({
    rol_ID: 1,
    estado_ID: 1,
    correo: "",
    nombre: "",
    razon_social: "",
    nombre_comercial: "",
    direccion_entrega: "",
    password: "",
    telefono: "",
    fecha_nacimiento: "",
  });

  // Manejador del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar recargar la página
    // if (nameCategory === "") {
    //   setError("El campo nombre es requerido");
    //   return;
    // }
    functionPost(formData);
    setError(null); // Limpiar errores
    setOpen(false);

  };

  // const handleChange = (event) => {
  //   setAge(event.target.value);
  // };

  // Manejador del cambio de valores en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <Box sx={{ mt: 2 }}>
        {error && <Alert severity="error">{error}</Alert>}
        <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit}>
          <FormControl fullWidth>
            <InputLabel size="small" id="demo-simple-select-label">
              Usuario
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              name="rol_ID"
              value={1}
              label="Age"
              size="small"
              onChange={handleChange}
            >
              <MenuItem value={1}>Administrador</MenuItem>
              <MenuItem value={2}>Cliente</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Nombre"
            name="nombre"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.nombre}
            size="small"
            onChange={handleChange}
          />
          <TextField
            label="Email"
            name="correo"
            variant="outlined"
            fullWidth
            margin="normal"
            type="email"
            value={formData.correo}
            size="small"
            onChange={handleChange}
          />
          <TextField
            label="Razon Social"
            name="razon_social"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.razon_social}
            size="small"
            onChange={handleChange}
          />
          <TextField
            label="Nombre Comercial"
            name="nombre_comercial"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.nombre_comercial}
            size="small"
            onChange={handleChange}
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Telefono"
                name="telefono"
                variant="outlined"
                margin="normal"
                type="number"
                value={formData.telefono}
                size="small"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="fecha_nacimiento"
                type="date"
                variant="outlined"
                margin="normal"
                size="small"
                fullWidth
                value={formData.fecha_nacimiento}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <TextField
            label="Dirrección"
            name="direccion_entrega"
            variant="outlined"
            fullWidth
            margin="normal"
            size="small"
            value={formData.direccion_entrega}
            onChange={handleChange}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={formData.password}
            size="small"
            onChange={handleChange}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            type="submit"
          >
            Registrar
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default RegisterForm;
