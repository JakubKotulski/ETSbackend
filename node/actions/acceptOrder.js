const Order = require("../models/Order");
const User = require("../models/User");
const Wash = require("../models/Wash");

const acceptOrder = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userID });
    const payment = user.income + Math.floor(req.body.distance * 0.3);
    const doesExist = await Wash.findOne({ userID: req.body.userID });
    if (doesExist) {
      await Wash.updateOne({ userID: req.body.userID }, { $inc: { distance: req.body.distance } });
    } else {
      const wash = new Wash({
        distance: req.body.distance,
        userID: req.body.userID,
      });

      await wash.save();
    }
    await Order.updateOne({ _id: req.body._id }, { $set: { accepted: "true" } });
    const Orders = await Order.find({ userID: req.body.userID, accepted: "true" });
    let distanceToSet = 0;
    let fuelConsumption = 0;

    for (let i = 0; i < Orders.length; i++) {
      distanceToSet = distanceToSet + Orders[i].distance;
      fuelConsumption = fuelConsumption + Orders[i].fuelConsumption;
    }

    const avarageFuelConsumption = (fuelConsumption / distanceToSet) * 100;

    await User.updateOne({ username: "Hamdam" }, { $inc: { companyBalance: -Math.floor(req.body.distance * 0.3) } });

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

    await User.updateOne({ _id: req.body.userID }, { $inc: { monthDistance: req.body.distance } });

    return res.status(200).send("Accepted");
  } catch (err) {
    console.log(err);
  }
};

module.exports = { acceptOrder };
