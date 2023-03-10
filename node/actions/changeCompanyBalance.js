const User = require("../models/User");

const changeCompanyBalance = async (req, res) => {
  try {
    await User.updateOne({ username: "Hamdam" }, { $set: { companyBalance: req.body.amount } });
    return res.status(200).send("Updated");
  } catch (err) {
    console.log(err);
  }
};

module.exports = { changeCompanyBalance };
