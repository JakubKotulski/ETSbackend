const destination = require("../countriesData");
const Order = require("../models/Order");

const setOrder = async (req, res) => {
  try {
    const countries = req.body.countries;
    let lastCords = "";
    let arrayOfRange = [];
    let resArray = [];

    for (let i = 0; i < countries.length; i++) {
      for (let j = 0; j < destination.length; j++) {
        if (countries[i] === destination[j][0]) {
          arrayOfRange.push(destination[j]);
        }
      }
    }

    for (let i = 0; i < 4; i++) {
      let country = Math.floor(Math.random() * arrayOfRange.length);
      let city = Math.floor(Math.random() * (arrayOfRange[country].length - 1) + 1);

      while (lastCords === `${arrayOfRange[country][0]}, ${arrayOfRange[country][city]}`) {
        country = Math.floor(Math.random() * (arrayOfRange.length - 1));
        city = Math.floor(Math.random() * (arrayOfRange[country].length - 1) + 1);
      }

      if (resArray.length === 0) {
        resArray.push([`Polska, Słupsk - ${arrayOfRange[country][0]}, ${arrayOfRange[country][city]}`]);
        const newOrder = new Order({
          way: `Polska, Łódź - ${arrayOfRange[country][0]}, ${arrayOfRange[country][city]}`,
          userID: req.user._id,
        });
        await newOrder.save();
      } else if (resArray.length < 4) {
        resArray.push([`${lastCords} - ${arrayOfRange[country][0]}, ${arrayOfRange[country][city]}`]);
        const newOrder = new Order({
          way: `${lastCords} - ${arrayOfRange[country][0]}, ${arrayOfRange[country][city]}`,
          userID: req.user._id,
        });
        await newOrder.save();
      }
      lastCords = `${arrayOfRange[country][0]}, ${arrayOfRange[country][city]}`;
    }

    resArray = req.body.countries;
    const newOrder = new Order({
      way: `${lastCords} - Polska, Słupsk`,
      userID: req.user._id,
    });
    await newOrder.save();

    res.status(201);
    return res.json(resArray);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { setOrder };
