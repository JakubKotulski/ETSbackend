const User = require("../models/User");

const acceptRepair = async (req, res) => {
  try {
    await User.updateOne({ _id: req.body._id }, { $set: { waste: 0, wastePhoto: "", wasteTrailer: 0 } });
    await User.updateOne({ username: "Hamdam" }, { $inc: { companyBalance: -req.body.amount } });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { acceptRepair };