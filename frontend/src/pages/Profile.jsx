import { useEffect, useState } from "react";

export default function Profile() {

  const [user, setUser] = useState(null);

  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    image: "",
  });

  // ✅ LOAD USER
  const loadUser = () => {

    try {

      const stored = localStorage.getItem("user");

      if (!stored) {
        setUser(null);
        return;
      }

      const parsed = JSON.parse(stored);

      setUser(parsed);

      // ✅ preload edit form
      setForm({
        fullName: parsed.fullName || "",
        username: parsed.username || "",
        email: parsed.email || "",
        phone: parsed.phone || "",
        image: parsed.image || "",
      });

    } catch (err) {

      console.log("Parse error:", err);

      setUser(null);
    }
  };

  useEffect(() => {

    loadUser();

    // ✅ refresh when tab becomes active
    window.addEventListener("focus", loadUser);

    return () => {
      window.removeEventListener("focus", loadUser);
    };

  }, []);

  // ✅ SAVE PROFILE
  const handleSave = () => {

    const updatedUser = {
      ...user,
      ...form,
    };

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

    setUser(updatedUser);

    setEditing(false);

    alert("Profile updated ✅");
  };

  // ❌ NO USER
  if (!user) {

    return (
      <div className="p-6 text-center">
        <p className="text-gray-500 text-lg">
          No user data 😴
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">

      <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">

        {/* HEADER */}
        <div className="bg-orange-500 h-32 relative">

          <div className="absolute left-1/2 transform -translate-x-1/2 top-14">

            <img
              src={
                form.image ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="profile"
              className="w-28 h-28 rounded-full border-4 border-white object-cover shadow-lg"
            />

          </div>
        </div>

        {/* CONTENT */}
        <div className="pt-20 p-8">

          <div className="flex justify-between items-center mb-6">

            <h1 className="text-3xl font-bold">
              Profile 👤
            </h1>

            {!editing ? (

              <button
                onClick={() => setEditing(true)}
                className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-xl transition"
              >
                Edit Profile
              </button>

            ) : (

              <button
                onClick={handleSave}
                className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl transition"
              >
                Save Changes
              </button>
            )}
          </div>

          {/* VIEW MODE */}
          {!editing ? (

            <div className="space-y-4 text-lg">

              <p>
                <strong>ID:</strong> {user.id}
              </p>

              <p>
                <strong>Full Name:</strong> {user.fullName}
              </p>

              <p>
                <strong>Username:</strong> {user.username}
              </p>

              <p>
                <strong>Email:</strong> {user.email}
              </p>

              <p>
                <strong>Phone:</strong> {user.phone}
              </p>

            </div>

          ) : (

            // ✏ EDIT MODE
            <div className="space-y-4">

              <input
                type="text"
                placeholder="Full Name"
                value={form.fullName}
                onChange={(e) =>
                  setForm({
                    ...form,
                    fullName: e.target.value,
                  })
                }
                className="w-full border p-3 rounded-xl"
              />

              <input
                type="text"
                placeholder="Username"
                value={form.username}
                onChange={(e) =>
                  setForm({
                    ...form,
                    username: e.target.value,
                  })
                }
                className="w-full border p-3 rounded-xl"
              />

              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
                className="w-full border p-3 rounded-xl"
              />

              <input
                type="text"
                placeholder="Phone"
                value={form.phone}
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone: e.target.value,
                  })
                }
                className="w-full border p-3 rounded-xl"
              />

              <input
                type="text"
                placeholder="Profile Image URL"
                value={form.image}
                onChange={(e) =>
                  setForm({
                    ...form,
                    image: e.target.value,
                  })
                }
                className="w-full border p-3 rounded-xl"
              />

            </div>
          )}
        </div>
      </div>
    </div>
  );
}