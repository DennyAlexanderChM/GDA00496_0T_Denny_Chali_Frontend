import { Typography, Button, Container, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import CategoriesTable from "../components/CategoryComponents/CategoryTable";
import CategoriesForm from "../components/CategoryComponents/FormCategory";
import ModalForm from "../components/ModalForm";

function Categories({ user }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch("http://localhost:3000/api/categoria", {
          method: "GET",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          setError("Error al obtener las categorias de productos");
          //throw new Error("Error al obtener las categorias de productos");
        }
        const data = await response.json();
        setCategories(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders", error);
      }
    };

    fetchData();
  }, []);
  // Activar desactivar una categoria
  const activarCategoria = async (CategoriaID, EstadoID) => {
    const EstadoNuevoID = EstadoID === 1 ? 2 : 1;
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        "http://localhost:3000/api/categoria/updateState/",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            categoria_ID: CategoriaID,
            estado_ID: EstadoNuevoID,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al activar usuario");
      }
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.CategoriaID === CategoriaID
            ? { ...category, FK_EstadosID: EstadoNuevoID }
            : category
        )
      );
    } catch (error) {
      console.error("Error activando categoria", error);
    }
  };

  //Crear una nueva categoria
  const crearCategoria = async (CategoriaID) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch("http://localhost:3000/api/categoria", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          usuario_ID: user.id,
          nombre_categoria: CategoriaID,
        }),
      });

      if (!response.ok) {
        setError("Error al crear la categoria");
        throw new Error("Error al crear la categoria");
      }
      const data = await response.json();
      setCategories((prevCategories) => [...prevCategories, data]);
      setError(null);
    } catch (error) {
      console.error("Error creando categoria", error);
    }
  };

  if (loading) {
    return (
      <Typography variant="h4" gutterBottom>
        Bienvenido {user.username}, Cargando Categorias...
      </Typography>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Categorías de productos
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <ModalForm
        element={"categoria"}
        Form={CategoriesForm}
        functionPost={crearCategoria}
      />
      <CategoriesTable
        categories={categories}
        activarCategoria={activarCategoria}
        setCategories={setCategories}
      />
    </Container>
  );
}

export default Categories;
