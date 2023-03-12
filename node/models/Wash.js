const mongoose = require("mongoose");
const User = require("./User");

const wash = new mongoose.Schema({
  distance: {type: Number, default: 0},
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
});

module.exports = mongoose.model("Wash", wash);