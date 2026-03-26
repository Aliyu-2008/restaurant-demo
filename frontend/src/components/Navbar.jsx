import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn, logout } from "../utils/auth";

export default function Navbar() {
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <h1 className="text-2xl font-bold text-orange-500 cursor-pointer hover:scale-105 transition">
          🍽 Restaurant-name
        </h1>

        {/* Links */}
        <div className="flex gap-6 items-center text-gray-700 font-medium">

          {loggedIn ? (
            <>
              <Link className="hover:text-orange-500 transition" to="/menu">Menu</Link>
              <Link className="hover:text-orange-500 transition" to="/orders">Orders</Link>
              <Link className="hover:text-orange-500 transition" to="/profile">Profile</Link>
              <Link className="hover:text-orange-500 transition" to="/cart">Cart</Link>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition hover:scale-105"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="hover:text-orange-500 transition" to="/">Home</Link>
              <Link className="hover:text-orange-500 transition" to="/login">Login</Link>

              <Link
                to="/register"
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition hover:scale-105"
              >
                Sign Up
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}