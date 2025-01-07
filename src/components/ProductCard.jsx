import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";


// Componente que muestra la información de un producto
// Recibe un objeto con la información del producto
const ProductCard = ({ product }) => {
  return (
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
  );
};

export default ProductCard;
