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

mongoose.connect("mongodb://127.0.0.1:27017/studentDB");
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.post("/register", async (req,res)=>{
  const hash = await bcrypt.hash(req.body.password,10);
  await User.create({ email:req.body.email, password:hash });
  res.send("Registered");
});

app.post("/login", async (req,res)=>{
  const user = await User.findOne({ email:req.body.email });
  const ok = await bcrypt.compare(req.body.password,user.password);
  if(!ok) return res.send("Invalid");

  const token = jwt.sign({ id:user._id }, "secret");
  res.json({ token });
});

app.post("/predict", async (req,res)=>{
  const { attendance, study } = req.body;

  let result = (attendance>70 && study>2)?"Pass":"Fail";

  await Prediction.create({ attendance, study, result });

  res.json({ result });
});

app.get("/history", async (req,res)=>{
  const data = await Prediction.find().sort({_id:-1});
  res.json(data);
});

app.listen(5000, ()=>console.log("Server running"));