require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const path = require("path");

app.use(express.static(path.join(__dirname, "../frontend")));


const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// 🔥 главная страница
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// API
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/analytics", require("./routes/analyticsRoutes"));

app.listen(5000, () => {
  console.log("🚀 Server: http://localhost:5000");
});
