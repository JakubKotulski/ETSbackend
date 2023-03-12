const Wash = require("../models/Wash");

const acceptWash = async (req, res) => {
  try {
    await Wash.updateOne({ userID: req.user._id }, { $set: { distance: 0 } });
    return res.status(200).send("Zrobione");
  } catch (err) {
    console.log(err);
  }
};

module.exports = { acceptWash };
