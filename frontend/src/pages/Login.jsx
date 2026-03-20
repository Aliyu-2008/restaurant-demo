import { useState } from "react";
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
      await loginUser({ username, password });

      login("user-token");

      navigate("/menu"); // ✅ redirect
    } catch {
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

      <button className="bg-orange-500 text-white px-4 py-2">
        Login
      </button>
    </form>
  );
}