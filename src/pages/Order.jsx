import { Typography, Button, Container } from "@mui/material";
import { useEffect, useState } from "react";

import Order from "../components/OrderComponents/OrderTable";

const Pedidos = ({ user }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch("http://localhost:3000/api/orden/pending/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Error al obtener las ordenes");
        }
        const data = await response.json();
        setOrders(data[0]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders", error);
      }
    };

    fetchData();
  }, []);

  const activarPedido = async (OrderID, EstadoID) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        "http://localhost:3000/api/orden/changeStatus/",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            orden_ID: OrderID,
            estado_ID: EstadoID,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al activar pedido");
      }
      // Modifcar la lista de pedidos para que se actualice en la tabla eliminando item con OrderID
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.OrdenID !== OrderID)
      );

    } catch (error) {
      console.error("Error al activar pedido", error);
    }
  };
  if (loading) {
    return (
      <Typography variant="h4" gutterBottom>
        Bienvenido {user.username}, Cargando Pedidos...
      </Typography>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }} >
      <Typography variant="h4" gutterBottom>
        Pedidos recibidos
      </Typography>

      <Order 
      ordersDetails={orders} 
      activarPedido={activarPedido}
      />
    </Container>
  );
};

export default Pedidos;
