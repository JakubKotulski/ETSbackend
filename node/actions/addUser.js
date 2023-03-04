const User = require("../models/User");

const addUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (user) {
      return res.json("User already exists");
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 15);

    const newUser = new User({
      username: req.body.username,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201);

    return res.json(newUser);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { addUser };
