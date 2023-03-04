const Order = require("../models/Order");

const getOrders = async (req, res) => {
  try {
    const data = await Order.find();
    return res.json(data);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getOrders };
