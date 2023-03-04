const Order = require("../models/Order");

const getMyRejectedOrders = async (req, res) => {
  try {
    const data = await Order.find({ userID: req.user._id, accepted: "rejected" });
    return res.json(data);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getMyRejectedOrders };
