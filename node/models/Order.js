const mongoose = require("mongoose");
const User = require("./User");

const order = new mongoose.Schema({
  startState: {type: Number, default: 0},
  endState: {type: Number, default: 0},
  startStateEmpty: {type: Number, default: 0},
  endStateEmpty: {type: Number, default: 0},
  distance: { type: Number, default: 0 },
  fuelPrice: {type: Number, default: 0},
  boughtFuel : {type: Number, default: 0},
  fuelConsumption: { type: Number, default: 0 },
  wasteTrailer: {type: Number, default: 0},
  wasteTruck: {type: Number, default: 0},
  wasteStuff: {type: Number, default: 0},
  income: { type: Number, default: 0 },
  file: { type: String, default: "" },
  way: { type: String, default: "" },
  accepted: { type: String, default: "false" },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
});

module.exports = mongoose.model("Order", order);
