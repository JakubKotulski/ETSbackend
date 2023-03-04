const User = require("./models/User");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;

const passportConfig = (passport) => {
  passport.use(
    new localStrategy((username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) throw err;
        if (!user) return done(null, false);
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      });
    })
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });
  passport.deserializeUser((id, cb) => {
    User.findOne({ _id: id }, (err, user) => {
      const userInformation = {
        _id: user._id,
        username: user.username,
        technicalReview: user.technicalReview,
        insurance: user.insurance,
        isAdmin: user.isAdmin,
        distance: user.distance,
        doneOrders: user.doneOrders,
        avarageFuelConsumption: user.avarageFuelConsumption,
        income: user.income,
      };
      cb(err, userInformation);
    });
  });
};

module.exports = passportConfig;
