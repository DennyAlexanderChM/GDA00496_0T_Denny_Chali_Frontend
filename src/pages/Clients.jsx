import { Typography, Container, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import ClientTable from "../components/ClientComponents/ClientTable";
import ModalForm from "../components/ModalForm";

// Desactivar usuario o activar

const Clientes = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar los clientes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch("http://localhost:3000/api/clientes", {
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
        setClients(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };

    fetchData();
  }, []);

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
      setClients((prevClients) =>
        prevClients.map(
          (
            user // Modificar el estado del usuario
          ) =>
            user.UsuarioID === UserID // Si el usuario es el mismo
              ? { ...user, Nombre_Estado: EstadoNuevoID === 1 ? "Activo" : "Inactivo",} // Modificar el estado
              : user
        )
      );
    } catch (error) {
      console.error("Error activando usuario", error);
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
        Clientes
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}

      <ClientTable
        clients={clients}
        desactivarUsuario={activarUsuario}
        onConfirm={handleDelete}
      />
    </Container>
  );
};

export default Clientes;
