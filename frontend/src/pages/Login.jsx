import { useState } from "react";
import axios from "axios";
import { loginUser } from "../api";
import { useNavigate } from "react-router-dom";
import { login } from "../utils/auth";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      { username, password }
    );

    console.log("LOGIN RESPONSE:", res); // 👈 DEBUG
    console.log("DATA:", res.data);
    console.log("USER:", res.data.user);
    // ✅ SAVE USER
    localStorage.removeItem("user"); // clear old user
    localStorage.setItem("user", JSON.stringify(res.data.user));

    navigate("/menu");

  } catch (err) {
    console.log(err.response?.data || err.message);
    alert("Login failed");
  }
};

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <input
        placeholder="Username"
        className="border p-2 w-full"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button  className="bg-orange-500 text-white px-4 py-2">
        Login
      </button>
    </form>

  );
}