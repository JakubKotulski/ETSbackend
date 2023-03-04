const getLoggedUser = (req, res) => {
  res.json(req.user);
};

module.exports = { getLoggedUser };
