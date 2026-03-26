import { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState(null);

  const loadUser = () => {
    try {
      const stored = localStorage.getItem("user");

      if (!stored) {
        setUser(null);
        return;
      }

      const parsed = JSON.parse(stored);
      setUser(parsed);
    } catch (err) {
      console.log("Parse error:", err);
      setUser(null);
    }
  };

  useEffect(() => {
    loadUser();

    // 🔥 listen for changes (important)
    window.addEventListener("storage", loadUser);

    return () => {
      window.removeEventListener("storage", loadUser);
    };
  }, []);

  if (!user) {
    return <p className="p-6">No user data</p>;
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <div className="card">

        <h1 className="text-2xl font-bold mb-4">Profile 👤</h1>

        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Full Name:</strong> {user.fullName}</p>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>

      </div>
    </div>
  );
}