import { Typography, Button, Container } from "@mui/material";
import { useEffect, useState } from "react";
import ProductsTable from "../components/ProductComponents/ProductsTable";
import FormProduct from "../components/ProductComponents/FormProduct";

function Products({ user }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openCreate, setOpenCreate] = useState(false);
  const [categories, setCategories] = useState([]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch("http://localhost:3000/api/producto", {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Error al obtener las categorias de productos");
      }
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders", error);
    }
  };

  const fetchDataCategories = async () => {
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
    } catch (error) {
      console.error("Error fetching orders", error);
    }
  };

  // Desactivar usuario o activar
  const activarProducto = async (ProductID, EstadoID) => {
    const EstadoNuevoID = EstadoID === 1 ? 2 : 1;
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        "http://localhost:3000/api/producto/updateState/",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            producto_ID: ProductID,
            estado_ID: EstadoNuevoID,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al activar usuario");
      }
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.ProductoID === ProductID
            ? {
                ...product,
                Nombre_Estado: EstadoNuevoID === 1 ? "Activo" : "Inactivo",
              }
            : product
        )
      );
    } catch (error) {
      console.error("Error activando producto", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchDataCategories();
  }, []);

  

  if (loading) {
    return (
      <Typography variant="h4" gutterBottom>
        Bienvenido {user.username}, Cargando Productos...
      </Typography>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>
      <Button
        variant="contained"
        sx={{ mb: 2 }}
        onClick={() => setOpenCreate(true)}
      >
        Añadir producto
      </Button>
      <ProductsTable
        products={products}
        activarProducto={activarProducto}
        categories={categories}
        setProducts={setProducts}
      />
      <FormProduct
        openCreate={openCreate}
        setOpenCreate={setOpenCreate}
        setProducts={setProducts}
        categories={categories}
      />
    </Container>
  );
}

export default Products;
