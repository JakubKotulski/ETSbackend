const User = require("../models/User");

const resetMonthDistance = async (req, res) => {
  try {
    console.log(req.user);
    await User.updateOne({ _id: req.user._id }, { $set: { monthDinstaneReset: req.body.month, monthDistance: 0 } });
    return res.status(201).send("Updated");
  } catch (err) {
    console.log(err);
  }
};

module.exports = { resetMonthDistance };
