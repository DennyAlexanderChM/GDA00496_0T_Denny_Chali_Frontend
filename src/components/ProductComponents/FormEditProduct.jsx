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

export default function BasicModal({
  editID,
  openEdit,
  setOpenEdit,
  setProducts,
  categories,
}) {
  const [formData, setFormData] = React.useState({
    producto_ID: 0,
    categoria_ID: 1,
    usuario_ID: 0,
    nombre_producto: "",
    marca: "",
    codigo: "",
    stock: 0,
    estado_ID: 0,
    precio: 0,
    foto: "",
  });

  const handleOpen = () => setOpenEdit(true);
  const handleClose = () => setOpenEdit(false);
  // Cargar el producto
  React.useEffect(() => {
    if (openEdit === false) {
      return;
    }
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(
          `http://localhost:3000/api/producto/${editID}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json; charset=UTF-8",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Error al obtener los usuarios");
        }
        const data = await response.json();
        setFormData({
          producto_ID: data.ProductoID,
          categoria_ID: data.FK_CategoriaID,
          usuario_ID: data.FK_UsuarioID,
          nombre_producto: data.Nombre_Producto,
          marca: data.Marca,
          codigo: data.Codigo,
          stock: data.Stock,
          estado_ID: data.FK_EstadoID,
          precio: data.Precio,
          foto: data.Foto,
        });
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };

    fetchData();
  }, [openEdit]);

  // Manejador del envío del formulario
  const handleSubmitEdit = async (e) => {
    e.preventDefault(); // Evitar recargar la página

    try {
      const token = localStorage.getItem("authToken");
      const usuario = JSON.parse(localStorage.getItem("user"));
      const response = await fetch("http://localhost:3000/api/producto", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          producto_ID: formData.producto_ID,
          categoria_ID: formData.categoria_ID,
          usuario_ID: usuario.UsuarioID,
          nombre_producto: formData.nombre_producto,
          marca: formData.marca,
          codigo: formData.codigo,
          stock: formData.stock,
          estado_ID: formData.estado_ID,
          precio: formData.precio,
          foto: formData.foto,
        }),
      });

      if (!response.ok) {
        setMensaje("Ocurrio un error");
        throw new Error("Error al activar usuario");
      }

      const data = await response.json();
      setProducts((prevCategories) =>
        prevCategories.map((category) =>
          category.ProductoID === formData.producto_ID
            ? data
            : category
        )
      );
      setMensaje("Correcto");
    } catch (error) {
      console.error("Error activando producto", error);
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
        open={openEdit}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="box_form" sx={style}>
          <Typography variant="h5" component="h2" gutterBottom>
            Editar Categoria
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
