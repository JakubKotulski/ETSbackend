const Order = require("../models/Order");

const getMyOrders = async (req, res) => {
  try {
    const data = await Order.find({ userID: req.user._id, accepted: "false" });
    return res.json(data);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getMyOrders };
