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
    categoria_ID: 0,
    usuario_ID: 0,
    nombre_producto: "",
    marca: "",
    codigo: "",
    stock: 0,
    estado_ID: 1,
    precio: "",
    foto: "",
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
              Categoría
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              name="categoria_ID"
              label="Categoría"
              size="small"
              value={formData.categoria_ID}
              onChange={handleChange}
              required
            >
              <MenuItem value={0}>Ninguno</MenuItem>
              <MenuItem value={1}>Administrador</MenuItem>
              <MenuItem value={2}>Cliente</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Producto"
            name="nombre_producto"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.nombre_producto}
            size="small"
            onChange={handleChange}
          />
          <TextField
            label="Marca"
            name="marca"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.marca}
            size="small"
            onChange={handleChange}
          />
          <TextField
            label="Codigo"
            name="codigo"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.codigo}
            size="small"
            onChange={handleChange}
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Stock"
                name="stock"
                variant="outlined"
                margin="normal"
                type="number"
                value={formData.stock}
                size="small"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Precio"
                name="precio"
                type="number"
                variant="outlined"
                margin="normal"
                size="small"
                fullWidth
                value={formData.precio}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <TextField
            label="Foto"
            name="foto"
            variant="outlined"
            fullWidth
            margin="normal"
            size="small"
            value={formData.foto}
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
