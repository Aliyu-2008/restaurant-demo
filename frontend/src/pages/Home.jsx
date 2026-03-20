import { useEffect, useState, } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Home() {
  const { id } = useParams();
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    fetchDishes();
  }, [id]);

  const fetchDishes = async () => {
  try {
    const url = id
      ? `http://localhost:5000/api/dishes/${id}`
      : `http://localhost:5000/api/dishes`;

    const res = await axios.get(url);
    setDishes(res.data);
  } catch (err) {
    console.log(err);
  }
};

  return (
    <div className="p-6 max-w-6xl mx-auto">
      
      {/* HERO SECTION */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          Delicious Food, Delivered Fast 🚀
        </h1>
        <p className="text-gray-500">
          Order your favorite meals anytime, anywhere
        </p>
      </div>

      {/* DISH GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {dishes.map((dish) => (
          <div
            key={dish.id}
            className="bg-white shadow-lg rounded-xl p-5 hover:scale-105 transition"
          >
            <h2 className="text-xl font-semibold">{dish.name}</h2>
            <p className="text-gray-500">{dish.description}</p>
            <p className="text-orange-500 font-bold mt-2">
              ₦{dish.price}
            </p>

            <button className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
              Order Now
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}