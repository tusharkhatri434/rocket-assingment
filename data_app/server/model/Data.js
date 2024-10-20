const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
  Age: Number,
  Day: Date,
  Gender:String,
  A:Number,
  B:Number,
  C:Number,
  D:Number,
  E:Number,
  F:Number
});

const Data = mongoose.model('data',DataSchema); 
module.exports = Data