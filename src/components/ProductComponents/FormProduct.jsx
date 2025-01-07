import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Modal, TextField, Select, MenuItem, Grid } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function FormProduct({
  openCreate,
  setOpenCreate,
  setProducts,
  categories,
}) {
  const [formData, setFormData] = React.useState({
    categoria_ID: 0,
    usuario_ID: 0,
    nombre_producto: "",
    marca: "",
    codigo: "",
    stock: 0,
    estado_ID: 1,
    precio: 0,
    foto: "",
  });

  // Manejador del envío del formulario
  const handleSubmitEdit = async (e) => {
    e.preventDefault(); // Evitar recargar la página
    // Crear un nuevo producto
    try {
      const usuario = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("authToken");
      formData.usuario_ID = usuario.UsuarioID;
      const response = await fetch("http://localhost:3000/api/producto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        setError("Error al crear la categoria");
        throw new Error("Error al crear la categoria");
      }

      const data = await response.json();
      setProducts((prevProducts) => [...prevProducts, data]);
    } catch (error) {
      console.error("Error creando producto", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <Modal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="box_form" sx={style}>
          <Typography variant="h5" component="h2" gutterBottom>
            Añadir Producto
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmitEdit}>
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
                {categories.map((categoria) => (
                  <MenuItem
                    key={categoria.CategoriaID}
                    value={categoria.CategoriaID}
                  >
                    {categoria.Nombre_Categoria}
                  </MenuItem>
                ))}
              </Select>
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
        </Box>
      </Modal>
    </div>
  );
}
