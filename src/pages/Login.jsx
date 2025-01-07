import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Alert,
} from "@mui/material";

export default function LoginPage({ user, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook de navegación

  const handleSubmit = async () => {
    try {
      // Si no se ha ingresado un email o password
      if (!email || !password) {
        setError("Complete todos los campos para continuar");
      } else {
        setError("");
        //console.log("Login attempt with:", { email, password });
        const response = await fetch("http://127.0.0.1:3000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify({
            correo: email,
            password: password,
          }),
        });

        if (!response.ok) {
          throw new Error("Error al iniciar sesión");
        }
        const userDate = await response.json();
        if (userDate && !userDate.error) {
          const { data, tokenSession } = userDate;
          localStorage.setItem("authToken", tokenSession);
          localStorage.setItem("user", JSON.stringify(data));
          setUser({
            id: data.UsuarioID,
            username: data.Nombre,
            rol: data.FK_RolID,
          });

          if (data.FK_RolID === 1) {
            navigate("/pedidos");
          } else if (data.FK_RolID === 2) {
            navigate("/shop");
          }
        }
      }
    } catch (error) {
      console.error("Error en el login:", error);
      setError(error.message);
    }
  };

  if (user) {
    return <h1>Sesion Iniciada</h1>;
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={3}
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 3,
          }}
        >
          <LockOutlinedIcon
            sx={{
              m: 1,
              bgcolor: "secondary.main",
              p: 1,
              borderRadius: "50%",
              color: "white",
            }}
          />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
        </Box>
        <Box component="form" sx={{ mt: 1 }} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
