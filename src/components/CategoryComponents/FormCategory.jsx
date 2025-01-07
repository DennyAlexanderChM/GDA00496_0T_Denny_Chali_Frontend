import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

const RegisterForm = ({ functionPost, setOpen }) => {
  const [nameCategory, setNameCategory] = useState("");

  // Manejador del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar recargar la página
    if (nameCategory === "") {
      setName("El campo nombre es requerido");
      return;
    }
    functionPost(nameCategory);
    setOpen(false);
  };

  return (
    <>
      <Box sx={{ mt: 2 }}>
        <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit}>
          <TextField
            label="Nombre"
            name="nombre-categoria"
            variant="outlined"
            fullWidth
            margin="normal"
            size="small"
            value={nameCategory}
            onChange={(e) => setNameCategory(e.target.value)}
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
