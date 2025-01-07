import { useState } from "react";
import { Container } from "@mui/material";
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import LoginPage from "./pages/Login";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Users from "./pages/Users";
import Clients from "./pages/Clients";
import Pedidos from "./pages/Order";
import Categories from "./pages/Categories";
import Shop from "./pages/Shop";
import { ProtectedRoute } from "./components/ProtectedRoute";
import ButtonAppBar from "./components/NavBar";

function App() {
  const [user, setUser] = useState(null);

  // const login = () => {
  //   setUser({
  //     id: 1,
  //     username: "admin",
  //     rol: "admin",
  //   });
  // };

  // const logout = () => {
  //   setUser(null);
  // };

  return (
    <BrowserRouter>
      <ButtonAppBar user={user} setUser={setUser} />

      <Container>
        <Routes>
          <Route element={<ProtectedRoute isAllowed={!!user && user.rol === 1} />}>
            <Route path="/home" element={<Home user={user} />} />
            <Route path="/usuarios" element={<Users user={user} />} />
            <Route path="/categorias" element={<Categories user={user} />} />
            <Route path="/clientes" element={<Clients user={user} />} />
            <Route path="/productos" element={<Products user={user} />} />
            <Route path="/pedidos" element={<Pedidos user={user} />} />
          </Route>
          <Route path="/" element={<LoginPage user={user} setUser={setUser} />} />
          <Route element={<ProtectedRoute isAllowed={!!user} />}>
            <Route path="/shop" element={<Shop setUser={setUser} />} />
          </Route>

          {/* <Route
            path="/productos"
            element={
              <ProtectedRoute user={user}>
                <Products />
              </ProtectedRoute>
            }
          /> */}
          <Route path="/404" element={<h1>Not Found</h1>} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
