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
    <div className="p-6 max-w-4xl mx-auto">

      <h1 className="text-2xl font-bold mb-6">Your Orders 🍽️</h1>

      {orders.length === 0 && (
        <p>No orders yet</p>
      )}

      {orders.map((order) => (
        <div key={order.id} className="card mb-4 flex justify-between items-center">

          <div>
            <h2 className="text-lg font-semibold">
              {order.dish_name}
            </h2>

            <p className="text-gray-400 text-sm">
  Order ID: #{order.id}
</p>

            <p className="text-gray-500">
              Quantity: {order.quantity}
            </p>
          </div>

          <div className="text-orange-500 font-bold">
            ₦{order.price * order.quantity}
          </div>

        </div>
      ))}

    </div>
  );
}