const mongoose = require("mongoose");

const user = new mongoose.Schema({
  username: { type: String, require: true },
  password: { type: String, require: true },
  technicalReview: { type: Boolean, default: false },
  insurance: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  distance: { type: Number, default: 0 },
  doneOrders: { type: Number, default: 0 },
  avarageFuelConsumption: { type: Number, default: 0 },
  income: { type: Number, default: 0 },
  waste: { type: Number, default: 0 },
  companyBalance: { type: Number, default: 0 },
  wastePhoto: { type: String, default: "" },
  wasteTrailer: { type: Number, default: 0 },
  technicalReviewMonth: { type: Number },
  technicalReviewDay: { type: Number },
  insuranceMonth: { type: Number },
  insuranceDay: { type: Number },
});
module.exports = mongoose.model("User", user);
