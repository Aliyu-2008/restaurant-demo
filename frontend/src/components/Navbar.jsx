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
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <h1 className="text-2xl font-bold text-orange-500">
          Foodie🔥
        </h1>

        {/* Links */}
        <div className="flex gap-6 items-center">
          {loggedIn ? (
            <>
              <Link to="/menu">Menu</Link>
              <Link to="/orders">Orders</Link>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/">Home</Link>
              <Link to="/login">Login</Link>
              <Link to="/register">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}