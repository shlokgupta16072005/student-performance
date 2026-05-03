const mongoose = require("mongoose");

module.exports = mongoose.model("Prediction", new mongoose.Schema({
  attendance:Number,
  study:Number,
  result:String
}));