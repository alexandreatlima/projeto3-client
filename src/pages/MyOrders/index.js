import { useEffect, useState } from "react";
import { api } from "../../api/api";

export function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await api.get("/order/myOrders");
        setOrders(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchOrders();
  }, []);

  return (
    <>
      <h1>Minhas compras</h1>

      {orders.map((currentOrder) => {
        return (
          <div>
            <strong>Codigo: {currentOrder._id}</strong>
            <span>Valor: {currentOrder.amount}</span>
            <strong>Status: {currentOrder.status}</strong>
          </div>
        );
      })}
    </>
  );
}
