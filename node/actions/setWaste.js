const User = require("../models/User");

const setWaste = async (req, res) => {
  try {
    await User.updateOne(
      { _id: req.user._id },
      { $set: { waste: req.body.waste, wastePhoto: req.body.wastePhoto, wasteTrailer: req.body.wasteTrailer } }
    );
    return res.status(200).send("Send");
  } catch (err) {
    console.log(err);
  }
};

module.exports = { setWaste };
