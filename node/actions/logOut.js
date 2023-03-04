const logOut = async (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
  });
  res.json({});
};

module.exports = { logOut };
