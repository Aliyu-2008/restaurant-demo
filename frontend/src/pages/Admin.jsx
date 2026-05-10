import { useEffect, useState } from "react";
import axios from "axios";

export default function Admin() {
  const [showForm, setShowForm] = useState(false);

  const [dishes, setDishes] = useState([]);
  const [orders, setOrders] = useState([]);

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchDishes();
    fetchOrders();
  }, []);

  // 🍔 GET DISHES
  const fetchDishes = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/dishes"
      );

      setDishes(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  // 📦 GET ORDERS
  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/orders/admin/all"
      );

      setOrders(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  // ➕ ADD / ✏ EDIT DISH
  const handleSubmit = async () => {

    if (!form.name || !form.price) {
      alert("Name and price required");
      return;
    }

    try {

      if (editingId) {

        await axios.put(
          `http://localhost:5000/api/dishes/${editingId}`,
          form
        );

        alert("Dish updated ✅");

      } else {

        await axios.post(
          "http://localhost:5000/api/dishes",
          form
        );

        alert("Dish added ✅");
      }

      setForm({
        name: "",
        price: "",
        description: "",
        image: "",
      });

      setEditingId(null);

      fetchDishes();

    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  // ✏ EDIT BUTTON
  const handleEdit = (dish) => {
    setForm(dish);
    setEditingId(dish.id);
  };

  // ❌ DELETE DISH
  const handleDelete = async (id) => {
    try {

      await axios.delete(
        `http://localhost:5000/api/dishes/${id}`
      );

      fetchDishes();

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">

      {/* PAGE TITLE */}
      <h1 className="text-4xl font-bold mb-8 text-center">
        Admin Dashboard 👑
      </h1>

      {/* TOGGLE BUTTON */}
<button
  onClick={() => setShowForm(!showForm)}
  className="bg-orange-500 text-white px-4 py-2 rounded mb-4"
>
  {showForm ? "Close Form" : "➕ Add New Dish"}
</button>

{/* FORM (HIDDEN BY DEFAULT) */}
{showForm && (
  <div className="bg-white shadow-lg rounded-2xl p-6 mb-10">

    <h2 className="text-2xl font-bold mb-4">
      Add Dish 🍔
    </h2>

    <input
      placeholder="Name"
      className="border p-2 w-full mb-2"
      value={form.name}
      onChange={(e) =>
        setForm({ ...form, name: e.target.value })
      }
    />

    <input
      placeholder="Price"
      className="border p-2 w-full mb-2"
      value={form.price}
      onChange={(e) =>
        setForm({ ...form, price: e.target.value })
      }
    />

    <input
      placeholder="Image URL"
      className="border p-2 w-full mb-2"
      value={form.image}
      onChange={(e) =>
        setForm({ ...form, image: e.target.value })
      }
    />

    <button
      onClick={handleSubmit}
      className="bg-green-500 text-white px-4 py-2 rounded"
    >
      Save Dish
    </button>

  </div>
)}

      {/* DISHES */}
      <h2 className="text-3xl font-bold mb-6">
        Restaurant Menu 🍽️
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">

        {dishes.map((dish) => (

          <div
            key={dish.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >

            <img
              src={dish.image}
              alt={dish.name}
              className="w-full h-48 object-cover"
            />

            <div className="p-5">

              <h3 className="text-2xl font-bold">
                {dish.name}
              </h3>

              <p className="text-gray-500 mt-2">
                {dish.description}
              </p>

              <p className="text-orange-500 font-bold mt-3 text-xl">
                ₦{dish.price}
              </p>

              <div className="flex gap-3 mt-4">

                <button
                  onClick={() => handleEdit(dish)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(dish.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>

              </div>

            </div>
          </div>
        ))}
      </div>

      {/* ORDERS */}
      <h2 className="text-3xl font-bold mb-6">
        Customer Orders 📦
      </h2>

      <div className="grid gap-5">

        {orders.map((order) => (

          <div
            key={order.id}
            className="bg-white shadow-lg rounded-xl p-5"
          >

            <p>
              <strong>Customer:</strong>
              {" "}
              {order.customer_name}
            </p>

            <p>
              <strong>Dish:</strong>
              {" "}
              {order.dish_name}
            </p>

            <p>
              <strong>Quantity:</strong>
              {" "}
              {order.quantity}
            </p>

            <p className="text-orange-500 font-bold text-lg">
              ₦{order.total}
            </p>

          </div>
        ))}
      </div>

    </div>
  );
}