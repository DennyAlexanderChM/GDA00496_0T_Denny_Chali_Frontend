import { ShoppingCart } from "@mui/icons-material";

import {
  IconButton,
  Badge,
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

const navOptions = {
  1: [
    { name: "Categorías", path: "/categorias" },
    { name: "Usuarios", path: "/usuarios" },
    { name: "Clientes", path: "/clientes" },
    { name: "Pedidos", path: "/pedidos" },
    { name: "Productos", path: "/productos" },
    { name: "Perfil", path: "/profile" },
  ],
  2: [
    { name: "Tienda", path: "/shop" },
    { name: "Pedidos", path: "/pedidos" },
    { name: "Carrito", path: "/cart" },
    { name: "Perfil", path: "/profile" },
  ],
};

export default function ButtonAppBar({ user, setUser }) {
  const logout = () => {
    setUser(null); // Limpiar el usuario
    localStorage.removeItem("authToken"); // Limpiar el token
    navigate("/"); // Redirigir a la página de login
  };

  if (user === null){
    return
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Mi Tiendita | {user.username}
          </Typography>
          {navOptions[user.rol].map((option, index) => (
            <Button color="inherit" key={index}>
              <Link className="linkNav" to={option.path}>
                {option.name}
              </Link>
            </Button>
          ))}

          <Button color="inherit" onClick={() => logout()}>
            Log Out
          </Button>
          {user.rol === 2 && (
            <IconButton color="inherit" onClick={console.log("click")}>
              <Badge badgeContent={4} color="error">
                <ShoppingCart size={24} />
              </Badge>
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
