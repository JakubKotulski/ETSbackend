const Order = require("../models/Order");

const sumOrder = async (req, res) => {
  try {
    const distance = req.body.endState - req.body.startState;
    const file = req.body.photo;
    const fuelConsumption = req.body.fuelUsed;
    const _id = req.body.id;

    await Order.updateOne(
      { _id: _id },
      {
        $set: {
          accepted: "pending",
          file: file,
          fuelConsumption: fuelConsumption,
          distance: distance,
          startState: req.body.startState,
          endState: req.body.endState,
          boughtFuel: req.body.fuelAmount,
          fuelPrice: req.body.fuelPrice,
          wasteTrailer: req.body.semiTrailerDamage,
          wasteTruck: req.body.truckDamage,
          wasteStuff: req.body.stuffDamage,
        },
      }
    );

    return res.status(201).send("Pending");
  } catch (err) {
    console.log(err);
  }
};

module.exports = { sumOrder };
