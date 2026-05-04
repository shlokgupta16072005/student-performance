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

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

// --- Routes ---

// Root route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Student Performance API is running 🚀" });
});

// Registration route
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

// Login route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send("User not found");

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).send("Invalid credentials");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "secret", { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Login error" });
  }
});

// Prediction route
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

// History route
app.get("/history", async (req, res) => {
  try {
    const data = await Prediction.find().sort({ _id: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch history" });
  }
});

// Export for Vercel (optional but good for compatibility)
module.exports = app;

// --- Render/Local Activation ---
// Render uses the PORT environment variable. 0.0.0.0 is mandatory for Render.
const PORT = process.env.PORT || 10000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
});