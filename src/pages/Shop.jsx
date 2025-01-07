import { useState, useEffect } from "react";
import {
  Grid,
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Drawer,
  Box,
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  useEffect(() => {
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
          throw new Error("Error al obtener los productos");
        }
        const data = await response.json();
        setProductos(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products", error);
      }
      // const response = await fetch("https://fakestoreapi.com/products");
      // const data = await response.json();
      // setProductos(data);
      // setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Typography variant="h4" gutterBottom>
        Cargando productos...
      </Typography>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Button variant="contained" sx={{ mb: 4 }} onClick={toggleDrawer(true)}>
        Carrito
      </Button>
      <Grid container spacing={3}>
        {productos.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.ProductoID}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="200"
                //image url should be dynamic
                image={product.Foto}
              />
              <CardContent sx={{ minHeight: 100 }}>
                <Typography gutterBottom variant="h5" component="div">
                  {product.Nombre_Producto}
                </Typography>
                <Typography variant="h6" color="primary">
                  Q{product.Precio.toFixed(2)}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "center" }}>
                <Button
                  variant="contained"
                  startIcon={<ShoppingCart className="w-4 h-4" />}
                  // Add margin button
                  sx={{ mb: 2 }}
                >
                  Añadir al carrito
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <div>
        <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
          <Box sx={{ width: 350, p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Shopping Cart
            </Typography>
          </Box>
        </Drawer>
      </div>
    </Container>
  );
};

export default Productos;
