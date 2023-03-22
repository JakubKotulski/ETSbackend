const User = require("../models/User");
const Order = require("../models/Order");
const Wash = require("../models/Wash");

const deleteUser = async (req, res) => {
  try {
    const orders = await Order.find({ userID: req.body._id });
    const wash = await Wash.find({ userID: req.body._id });
    if (orders.length !== 0) {
      await Order.deleteMany({ userID: req.body._id });
    }
    if (wash.length !== 0) {
      await Wash.deleteMany({ userID: req.body._id });
    }
    await User.deleteOne({ _id: req.body._id });
    return res.status(201).send("deleted");
  } catch (err) {
    console.log(err);
  }
};

module.exports = { deleteUser };
