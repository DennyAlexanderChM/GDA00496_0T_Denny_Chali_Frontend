import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Modal, TextField } from "@mui/material";

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
  setCategories,
}) {
  const [formData, setFormData] = React.useState({
    CategoriaID: 0,
    FK_UsuariosID: 0,
    Nombre_Categoria: "",
    FK_EstadosID: 1,
    Fecha_Creacion: "",
  });

  const [mensaje, setMensaje] = React.useState(null);
  const handleOpen = () => setOpenEdit(true);
  const handleClose = () => setOpenEdit(false);
  // Cargar los usuarios
  React.useEffect(() => {
    if (openEdit === false) {
      return;
    }
    setMensaje(null);
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(
          `http://localhost:3000/api/categoria/${editID}`,
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
        setFormData(data);
        console.log(data);
        // setUsers(data);
        // setLoading(false);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };

    fetchData();
  }, [openEdit]);

  // Manejador del envío del formulario
  const handleSubmitEdit = async (e) => {
    e.preventDefault(); // Evitar recargar la página
    // if (nameCategory === "") {
    //   setError("El campo nombre es requerido");
    //   return;
    // }
    // functionPost(nameCategory);
    // setError(null); // Limpiar errores
    // setOpen(false);
    try {
      const token = localStorage.getItem("authToken");
      const usuario = JSON.parse(localStorage.getItem("user"));
      const response = await fetch("http://localhost:3000/api/categoria", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          categoria_ID: formData.CategoriaID,
          usuario_ID: usuario.UsuarioID,
          estado_ID: formData.FK_EstadosID,
          nombre_categoria: formData.Nombre_Categoria,
        }),
      });

      if (!response.ok) {
        setMensaje("Ocurrio un error");
        throw new Error("Error al activar usuario");
      }
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.CategoriaID === formData.CategoriaID
            ? { ...category, Nombre_Categoria: formData.Nombre_Categoria }
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
              <TextField
                label="Nombre"
                name="Nombre_Categoria"
                variant="outlined"
                fullWidth
                margin="normal"
                size="small"
                value={formData.Nombre_Categoria}
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
