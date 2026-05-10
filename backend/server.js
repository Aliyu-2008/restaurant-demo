const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./config/db");

// ✅ CORS FIRST
app.use(
  cors({
    origin: [
      "https://ominous-xylophone-5gj9p75p6q672v7xg-5173.app.github.dev",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ HANDLE PREFLIGHT
app.options("*", cors());

app.use(express.json());

// ROUTES
const authRoutes = require("./routes/authRoutes");
const dishRoutes = require("./routes/dishRoutes");
const orderRoutes = require("./routes/orderRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/dishes", dishRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => res.send("API running with SQLite ✅"));

app.listen(5000, () =>
  console.log("Server running on port 5000")
);