import { useEffect, useState } from "react";
import axios from "axios";

export default function Admin() {
  const [dishes, setDishes] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchDishes();
  }, []);

  const fetchDishes = async () => {
    const res = await axios.get("http://localhost:5000/api/dishes");
    setDishes(res.data);
  };

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
        alert("Dish updated");
      } else {
        await axios.post("http://localhost:5000/api/dishes", form);
        alert("Dish added");
      }

      setForm({ name: "", price: "", description: "" });
      setEditingId(null);
      fetchDishes();
    } catch (err) {
      console.log(err);
      alert("Error");
    }
  };

  const handleEdit = (dish) => {
    setForm(dish);
    setEditingId(dish.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/dishes/${id}`);
    fetchDishes();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">

      <h1 className="text-2xl font-bold mb-6">Admin Panel 👑</h1>

      {/* FORM */}
      <div className="card mb-6">
        <input
          placeholder="Dish name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <button onClick={handleSubmit} className="btn btn-primary mt-3">
          {editingId ? "Update Dish" : "Add Dish"}
        </button>
      </div>

      {/* DISH LIST */}
      {dishes.map((dish) => (
        <div key={dish.id} className="card mb-3 flex justify-between">

          <div>
            <h2 className="font-bold">{dish.name}</h2>
            <p>{dish.description}</p>
            <p className="text-orange-500">₦{dish.price}</p>
          </div>

          <div className="flex gap-2">
            <button onClick={() => handleEdit(dish)}>Edit</button>
            <button onClick={() => handleDelete(dish.id)}>Delete</button>
          </div>

        </div>
      ))}
    </div>
  );
}