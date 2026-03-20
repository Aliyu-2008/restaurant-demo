import { placeOrder } from "../api";

export default function DishCard({ dish }) {
  const handleOrder = async () => {
    try {
      await placeOrder({
        user_id: 1,
        dish_id: dish.id,
        quantity: 1
      });

      alert("Order placed ✅");
    } catch (err) {
      console.error(err);
      alert("Order failed ❌");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-5">
      <h2 className="text-lg font-semibold">{dish.name}</h2>
      <p className="text-gray-600">{dish.description}</p>

      <div className="flex justify-between mt-4">
        <span className="text-green-600 font-bold">₦{dish.price}</span>
        <button
          onClick={handleOrder}
          className="bg-black text-white px-4 py-2 rounded-lg"
        >
          Order
        </button>
      </div>
    </div>
  );
}