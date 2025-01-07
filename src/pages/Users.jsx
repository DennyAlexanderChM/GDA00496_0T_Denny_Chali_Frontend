import { Typography, Container, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import Users from "../components/UserComponents/UsersTable";
import ModalForm from "../components/ModalForm";
import UserForm from "../components/UserComponents/FormUser";

const Usuarios = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar los usuarios
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch("http://localhost:3000/api/usuarios", {
          method: "GET",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Error al obtener los usuarios");
        }
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };

    fetchData();
  }, []);

  // Desactivar usuario o activar
  const activarUsuario = async (UserID, EstadoID) => {
    const EstadoNuevoID = EstadoID === 1 ? 2 : 1;
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        "http://localhost:3000/api/usuarios/updateState",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            usuario_ID: UserID,
            estado_ID: EstadoNuevoID,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al activar usuario");
      }

      // Modificar la lista de usuario con el nuevo estado
      setUsers((prevUsers) =>
        prevUsers.map(
          (
            user // Modificar el estado del usuario
          ) =>
            user.UsuarioID === UserID // Si el usuario es el mismo
              ? {
                  ...user,
                  Nombre_Estado: EstadoNuevoID === 1 ? "Activo" : "Inactivo",
                } // Modificar el estado
              : user
        )
      );
    } catch (error) {
      console.error("Error activando usuario", error);
    }
  };

  // Crear un nuevo usuario
  const crearUsuario = async (formData) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch("http://localhost:3000/api/usuarios", {
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
      setUsers((prevUsers) => [...prevUsers, data]);
      setError(null);
    } catch (error) {
      console.error("Error creando categoria", error);
    }
  };

  if (loading) {
    return (
      <Typography variant="h4" gutterBottom>
        Cargando usuarios...
      </Typography>
    );
  }

  const handleDelete = (UsuarioID) => {
    // Aquí iría la lógica para eliminar el elemento
    console.log("Elemento eliminado", UsuarioID);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Usuarios
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <ModalForm
        element={"usuario"}
        Form={UserForm}
        functionPost={crearUsuario}
      />

      <Users
        users={users}
        desactivarUsuario={activarUsuario}
        onConfirm={handleDelete}
      />
    </Container>
  );
};

export default Usuarios;
