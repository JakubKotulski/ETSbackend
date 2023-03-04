const User = require("../models/User");

const setInsurance = async (req, res) => {
  try {
    await User.updateOne({ _id: req.user._id }, { $set: { insurance: false } });
    return res.status(200).send("OK");
  } catch (err) {
    console.log(err);
  }
};

module.exports = { setInsurance };
