import { useState, useEffect } from "react";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  if (!user) return <p className="p-6">No user data</p>;

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const saveChanges = () => {
    localStorage.setItem("user", JSON.stringify(user));
    setEdit(false);
  };

  return (
    <div className="p-6 max-w-md mx-auto">

      <div className="card">

        <h1 className="text-2xl font-bold mb-4">Profile</h1>

        {edit ? (
          <>
            <input
              name="fullName"
              value={user.fullName}
              onChange={handleChange}
              className="border p-2 w-full mb-2"
            />

            <input
              name="email"
              value={user.email}
              onChange={handleChange}
              className="border p-2 w-full mb-2"
            />

            <input
              name="phone"
              value={user.phone}
              onChange={handleChange}
              className="border p-2 w-full mb-2"
            />

            <button onClick={saveChanges} className="btn btn-primary w-full">
              Save
            </button>
          </>
        ) : (
          <>
            <p><strong>Name:</strong> {user.fullName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>

            <button
              onClick={() => setEdit(true)}
              className="btn btn-primary mt-4 w-full"
            >
              Edit Profile
            </button>
          </>
        )}
      </div>

    </div>
  );
}