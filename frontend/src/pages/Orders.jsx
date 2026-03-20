import { useEffect, useState, useRef } from "react";
import { getOrders } from "../api";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const hasFetched = useRef(false);

  const fetchOrders = async () => {
    try {
      const res = await getOrders();
      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (hasFetched.current) return;

    fetchOrders();
    hasFetched.current = true;
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Orders</h1>

      {orders.map((o) => (
        <div key={o.id} className="border p-3 mb-2">
          Order #{o.id} - Dish {o.dish_id} (x{o.quantity})
        </div>
      ))}
    </div>
  );
}