require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Ensure these model files exist in your /server/models directory
const User = require("./models/User");
const Prediction = require("./models/Prediction");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection with error handling
// We don't call .listen() until the DB is connected to prevent startup errors
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

// --- Routes ---

// Root route (Helps Vercel verify the deployment is live)
app.get("/", (req, res) => {
  res.status(200).json({ message: "Student Performance API is running 🚀" });
});

app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    await User.create({ email, password: hash });
    res.status(201).send("Registered successfully");
  } catch (err) {
    res.status(500).json({ error: "Registration failed" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send("User not found");

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).send("Invalid credentials");

    // Replace "secret" with process.env.JWT_SECRET in production!
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "secret", { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Login error" });
  }
});

app.post("/predict", async (req, res) => {
  try {
    const { attendance, study } = req.body;
    let result = (attendance > 70 && study > 2) ? "Pass" : "Fail";

    await Prediction.create({ attendance, study, result });
    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: "Prediction failed" });
  }
});

app.get("/history", async (req, res) => {
  try {
    const data = await Prediction.find().sort({ _id: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch history" });
  }
});

// IMPORTANT: Export for Vercel's serverless environment
module.exports = app;

// Listen for local development
const PORT = process.env.PORT || 10000;
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}