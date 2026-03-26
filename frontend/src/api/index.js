import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// Auth endpoints
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);

// Dishes endpoints
export const getDishes = () => API.get("/dishes");

// Orders endpoints
export const placeOrder = (data) => API.post("/orders", data);
export const getOrders = () => API.get(`/orders/${user.id}`);