const User = require("../models/User");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    let companyDistance = 0;
    let companyOrders = 0;
    let companyFuel = 0;

    for (let i = 0; i < users.length; i++) {
      companyDistance = companyDistance + users[i].distance;
      companyOrders = companyOrders + users[i].doneOrders;
      companyFuel = companyFuel + users[i].avarageFuelConsumption;
    }
    return res.json({
      users,
      companyDistance: companyDistance,
      companyOrders: companyOrders,
      companyFuel: companyFuel,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getUsers };
