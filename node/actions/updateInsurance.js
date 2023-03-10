const User = require("../models/User");

const updateInsurance = async (req, res) => {
  try {
    await User.updateOne(
      { _id: req.user._id },
      { $set: { insurance: true, insuranceDay: req.body.insuranceDay, insuranceMonth: req.body.insuranceMonth } }
    );
    await User.updateOne({ username: "Hamdam" }, { $inc: { companyBalance: -10000 } });
    return res.status(200).send("Updated")
  } catch (err) {
    console.log(err);
  }
};

module.exports = { updateInsurance };
