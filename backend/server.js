require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const app = express(); // ✅ СНАЧАЛА создаём app

connectDB();

// middleware
app.use(cors());
app.use(express.json());

// ✅ раздаём frontend (HTML + CSS + JS)
app.use(express.static(path.join(__dirname, "../frontend")));

// главная страница
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// API routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/analytics", require("./routes/analyticsRoutes"));

// ✅ Render требует process.env.PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
