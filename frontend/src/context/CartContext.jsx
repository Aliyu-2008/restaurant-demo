import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (dish) => {
    console.log("ADDING:", dish); // 👈 DEBUG
    alert(`${dish.name} added to cart`);
    setCart((prev) => [...prev, dish]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}