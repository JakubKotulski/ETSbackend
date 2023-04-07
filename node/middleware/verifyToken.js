const jwt = require("jsonwebtoken");
const User = require("../models/User")
const config = process.env;

const  verifyToken = async (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers["authorization"];
  
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = await jwt.verify(token, config.TOKEN_SECRET);
    const userToSend = await User.findOne({ _id: decoded.user_id });
    req.user = userToSend;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;
