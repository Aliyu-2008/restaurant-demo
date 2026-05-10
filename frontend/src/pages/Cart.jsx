import { useContext } from "react";
import API from "../api";
import { CartContext } from "../context/CartContext";

export default function Cart() {

  const { cart, setCart } = useContext(CartContext);

  // ✅ CHECKOUT
  const handleCheckout = async () => {

    // ✅ stop empty checkout
    if (cart.length === 0) {
      alert("Cart is empty 🛒");
      return;
    }

    // ✅ get current user
    const user = JSON.parse(localStorage.getItem("user"));

    // ✅ prevent null user crash
    if (!user) {
      alert("Please login first");
      return;
    }

    try {

      // ✅ send all cart items
      for (let item of cart) {

        await API.post("/api/orders", {
          user_id: user.id,
          dish_id: item.id,
          quantity: 1,
        });
      }

      alert("Order placed successfully 🎉");

      // ✅ clear cart
      setCart([]);

    } catch (err) {

      console.log(err);

      alert("Checkout failed ❌");
    }
  };

  // ❌ REMOVE ITEM
  const removeItem = (index) => {

    const newCart = [...cart];

    newCart.splice(index, 1);

    setCart(newCart);
  };

  // 💰 TOTAL
  const total = cart.reduce(
    (sum, item) => sum + Number(item.price),
    0
  );

  return (
    <div className="p-6 max-w-3xl mx-auto">

      <h1 className="text-3xl font-bold mb-6 text-orange-500">
        Your Cart 🛒
      </h1>

      {cart.length === 0 ? (

        <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
          <p className="text-gray-500 text-lg">
            No items in cart 😴
          </p>
        </div>

      ) : (

        <>
          {cart.map((item, i) => (

            <div
              key={i}
              className="bg-white shadow-lg rounded-2xl p-4 mb-4 flex justify-between items-center"
            >

              <div>

                <h2 className="text-xl font-bold">
                  {item.name}
                </h2>

                <p className="text-orange-500 font-semibold">
                  ₦{item.price}
                </p>

              </div>

              <button
                onClick={() => removeItem(i)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Remove
              </button>

            </div>
          ))}

          <div className="bg-white shadow-xl rounded-2xl p-6 mt-6">

            <h2 className="text-2xl font-bold mb-4">
              Total: ₦{total}
            </h2>

            <button
              onClick={handleCheckout}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl text-lg font-bold transition"
            >
              Checkout 🚀
            </button>

          </div>
        </>
      )}

    </div>
  );
}