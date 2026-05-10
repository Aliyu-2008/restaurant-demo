import { useEffect, useState, useRef } from "react";
import { getOrders } from "../api";

export default function Orders() {

  const [orders, setOrders] = useState([]);
  const hasFetched = useRef(false);

  const fetchOrders = async () => {

    try {

      // ✅ get latest logged in user
      const user = JSON.parse(localStorage.getItem("user"));

      // ✅ prevent null crash
      if (!user) {
        console.log("No user found");
        return;
      }

      // ✅ fetch orders
      const res = await getOrders(user.id);

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

      <h1 className="text-3xl font-bold mb-6 text-orange-500">
        Your Orders 🍽️
      </h1>

      {orders.length === 0 ? (

        <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
          <p className="text-gray-500 text-lg">
            No orders yet 😴
          </p>
        </div>

      ) : (

        orders.map((order) => (

          <div
            key={order.id}
            className="bg-white shadow-lg rounded-2xl p-5 mb-4 flex justify-between items-center hover:scale-[1.01] transition"
          >

            <div>

              <h2 className="text-xl font-bold">
                {order.dish_name}
              </h2>

              <p className="text-gray-400 text-sm">
                Order ID: #{order.id}
              </p>

              <p className="text-gray-500 mt-1">
                Quantity: {order.quantity}
              </p>

            </div>

            <div className="text-orange-500 font-bold text-xl">
              ₦{order.price * order.quantity}
            </div>

          </div>
        ))
      )}

    </div>
  );
}