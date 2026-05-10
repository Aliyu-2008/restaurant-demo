import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// ================= AUTH =================

export const registerUser = (data) =>
  API.post("/api/auth/register", data);

export const loginUser = (data) =>
  API.post("/api/auth/login", data);

// ================= DISHES =================

export const getDishes = () =>
  API.get("/api/dishes");

// ================= ORDERS =================

export const placeOrder = (data) =>
  API.post("/api/orders", data);

export const getOrders = (userId) =>
  API.get(`/api/orders/${userId}`);

// ================= ADMIN =================

export const createDish = (data) =>
  API.post("/api/dishes", data);

export const deleteDish = (id) =>
  API.delete(`/api/dishes/${id}`);

export default API;