import { useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";

export default function Cart() {
  const { cart, setCart } = useContext(CartContext);

  const handleCheckout = async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  try {
    for (let item of cart) {
      await axios.post("http://localhost:5000/api/orders", {
        user_id: user.id,
        dish_id: item.id,
        quantity: 1
      });
      if (cart.length === 0) {
        alert("Car is empty");
      }
    }

    alert("Order placed successfully 🎉");

    setCart([]); // clear cart

  } catch (err) {
    console.log(err);
    alert("Checkout failed");
  }
};

  const removeItem = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cart.length === 0 && <p>No items in cart</p>}

      {cart.map((item, i) => (
        <div key={i} className="flex justify-between border p-3 mb-2">
          <span>{item.name} - ₦{item.price}</span>
          <button
            onClick={() => removeItem(i)}
            className="text-red-500"
          >
            Remove
          </button>
        </div>
      ))}

      <h2 className="mt-4 font-bold">Total: ₦{total}</h2>
      <button onClick={handleCheckout}
      className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
  Checkout
</button>
    </div>
  );
}