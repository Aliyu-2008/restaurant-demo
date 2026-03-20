import { useState } from "react";
import { registerUser } from "../api";
import { useNavigate } from "react-router-dom";
import { login } from "../utils/auth";

export default function Register() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    username: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      await registerUser(form);

      login("user-token"); // temp
      navigate("/menu");
    } catch (err) {
  console.log(err.response?.data || err.message);
  alert("Registration failed");
}
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 max-w-md mx-auto space-y-4 bg-white shadow rounded-xl"
    >
      <h1 className="text-2xl font-bold text-center">Create Account</h1>

      <input name="fullName" placeholder="Full Name" className="input" onChange={handleChange} />
      <input name="email" placeholder="Email" className="input" onChange={handleChange} />
      <input name="username" placeholder="Username" className="input" onChange={handleChange} />
      <input name="phone" placeholder="Phone Number" className="input" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" className="input" onChange={handleChange} />
      <input name="confirmPassword" type="password" placeholder="Confirm Password" className="input" onChange={handleChange} />

      <button className="bg-orange-500 text-white w-full py-2 rounded">
        Sign Up
      </button>
    </form>
  );
}