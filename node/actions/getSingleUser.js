const User = require("../models/User");

const getUser = async (req, res) => {
  try {
    const data = await User.findById({ _id: req.body._id });
    return res.json(data);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getUser };
