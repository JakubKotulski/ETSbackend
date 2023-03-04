const Order = require("../models/Order");

const rejectOrder = async (req, res) => {
  try {
    await Order.updateOne({ _id: req.body._id }, { $set: { accepted: "rejected" } });

    return res.status(200).send("Accepted");
  } catch (err) {
    console.log(err);
  }
};

module.exports = { rejectOrder };
