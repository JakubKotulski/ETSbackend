require("dotenv").config();

const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("./node/models/User");
const auth = require("./node/middleware/verifyToken");

const { getUsers } = require("./node/actions/getUsers");
const { sumOrder } = require("./node/actions/sumOrder");
const { getOrders } = require("./node/actions/getOrders");
const { acceptOrder } = require("./node/actions/acceptOrder");
const { setOrder } = require("./node/actions/setOrder");
const { getMyOrders } = require("./node/actions/getMyOrders");
const { rejectOrder } = require("./node/actions/rejectOrder");
const { getMyRejectedOrders } = require("./node/actions/getMyRejectedOrders");
const { setWaste } = require("./node/actions/setWaste");
const { updateTechnicalReview } = require("./node/actions/updateTechnicalReview");
const { updateInsurance } = require("./node/actions/updateInsurance");
const { changeCompanyBalance } = require("./node/actions/changeCompanyBalance");
const { acceptRepair } = require("./node/actions/acceptRepair");
const { setInsurance } = require("./node/actions/setInsurance");
const { setTechnicalReview } = require("./node/actions/setTechnicalReview.js");
const { getWash } = require("./node/actions/getWash");
const { acceptWash } = require("./node/actions/acceptWash");
const { getUser } = require("./node/actions/getSingleUser");
const { deleteUser } = require("./node/actions/deleteUser");
const { resetMonthDistance } = require("./node/actions/resetMonthDistance");

mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

app.use(
  cors({
    origin: [process.env.FRONTEND_URL, "https://www.linkpicture.com/"],
    credentials: true,
  })
);

app.use(cookieParser("secretcode"));

app.post("/user", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!(username && password)) {
      res.status(400).send("All input is required");
    }

    const oldUser = await User.findOne({ username });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password: encryptedPassword,
    });

    const token = jwt.sign({ user_id: user._id, username }, process.env.TOKEN_SECRET, {
      expiresIn: "2h",
    });
    user.token = token;

    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});

app.post("/user/signIn", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!(username && password)) {
      res.status(400).send("All input is required");
    }
    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ user_id: user._id, username }, process.env.TOKEN_SECRET);

      res.status(200).json({ user, token });
    } else {
      res.status(400).send("Invalid Credentials");
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/welcome", auth, (req, res) => {
  res.status(200).send(req.user);
});

app.put("/order/me", auth, sumOrder);
app.get("/orders", getOrders);
app.get("/order/me", auth, getMyOrders);
app.get("/order/me/rejected", auth, getMyRejectedOrders);
app.put("/order/accept", acceptOrder);
app.put("/order/reject", rejectOrder);
app.post("/order/create", auth, setOrder);

app.get("/me/wash", auth, getWash);
app.put("/me/wash", auth, acceptWash);

app.get("/users", getUsers);
app.post("/userOne", getUser);
app.delete("/user", deleteUser);
app.put("/me/waste", auth, setWaste);
app.put("/me/insurance", auth, updateInsurance);
app.put("/me/insuranceEnd", auth, setInsurance);
app.put("/me/technicalReview", auth, updateTechnicalReview);
app.put("/me/technicalReviewEnd", auth, setTechnicalReview);
app.put("/me/monthDistance", auth, resetMonthDistance);

app.put("/admin/balance", changeCompanyBalance);
app.put("/admin/repair", acceptRepair);

app.listen(4000, () => {
  console.log("Server has started");
});

module.exports = app;
