require("dotenv").config(); // must be first

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("./models/User");
const Prediction = require("./models/Prediction");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ ONLY ONE MongoDB connection (Atlas)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Routes
app.post("/register", async (req,res)=>{
  const hash = await bcrypt.hash(req.body.password,10);
  await User.create({ email:req.body.email, password:hash });
  res.send("Registered");
});

app.post("/login", async (req,res)=>{
  const user = await User.findOne({ email:req.body.email });
  if(!user) return res.send("User not found");

  const ok = await bcrypt.compare(req.body.password,user.password);
  if(!ok) return res.send("Invalid");

  const token = jwt.sign({ id:user._id }, "secret");
  res.json({ token });
});

app.post("/predict", async (req,res)=>{
  const { attendance, study } = req.body;

  let result = (attendance > 70 && study > 2) ? "Pass" : "Fail";

  await Prediction.create({ attendance, study, result });

  res.json({ result });
});

app.get("/history", async (req,res)=>{
  const data = await Prediction.find().sort({_id:-1});
  res.json(data);
});

// ✅ IMPORTANT for Render
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server running on port " + PORT));
