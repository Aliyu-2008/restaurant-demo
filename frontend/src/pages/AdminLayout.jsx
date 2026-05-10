import { Outlet, Link } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* ADMIN NAVBAR */}
      <div className="bg-black text-white p-4 flex justify-between">
        <h1 className="font-bold">Admin Dashboard 👑</h1>

        <Link to="/" className="text-sm underline">
          Back to Site
        </Link>
      </div>

      {/* PAGE CONTENT */}
      <div className="p-6">
        <Outlet />
      </div>

    </div>
  );
}