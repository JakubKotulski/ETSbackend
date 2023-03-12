const Wash = require("../models/Wash");

const getWash = async (req, res) => {
  try {
    const result =  await Wash.findOne({ userID: req.user._id });
    return res.json(result);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getWash };
