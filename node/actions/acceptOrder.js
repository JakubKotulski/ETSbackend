const Order = require("../models/Order");
const User = require("../models/User");

const acceptOrder = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userID });
    const payment = user.income + Math.floor(req.body.distance * 0.3);

    await Order.updateOne({ _id: req.body._id }, { $set: { accepted: "true" } });
    const Orders = await Order.find({ userID: req.body.userID, accepted: "true" });
    let distanceToSet = 0;
    let fuelConsumption = 0;

    for (let i = 0; i < Orders.length; i++) {
      distanceToSet = distanceToSet + Orders[i].distance;
      fuelConsumption = fuelConsumption + Orders[i].fuelConsumption;
    }

    const avarageFuelConsumption = fuelConsumption / Orders.length;

    await User.updateOne(
      { _id: req.body.userID },
      {
        $set: {
          doneOrders: Orders.length,
          avarageFuelConsumption: avarageFuelConsumption,
          distance: distanceToSet,
          income: payment,
        },
      }
    );

    return res.status(200).send("Accepted");
  } catch (err) {
    console.log(err);
  }
};

module.exports = { acceptOrder };
