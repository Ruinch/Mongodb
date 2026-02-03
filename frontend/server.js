require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'frontend')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/analytics", require("./routes/analyticsRoutes"));

app.get("/", (req, res) => {
    res.send("Server is working");
});

app.listen(5000, () => {
    console.log("Server started on port 5000");
});
