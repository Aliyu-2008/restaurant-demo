import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center px-6 bg-gradient-to-br from-orange-400 to-red-500 text-white">

      <h1 className="text-5xl font-bold mb-4">
        Food Delivery, Reinvented 🍔🔥
      </h1>

      <p className="mb-6 text-lg">
        Discover restaurants, order fast, enjoy life.
      </p>

      <div className="flex gap-4">
        <Link
          to="/login"
          className="bg-white text-orange-500 px-6 py-3 rounded-xl font-semibold"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="bg-black px-6 py-3 rounded-xl font-semibold"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}