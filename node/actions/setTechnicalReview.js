const User = require("../models/User");

const setTechnicalReview = async (req, res) => {
  try {
    await User.updateOne(
      { _id: req.user._id },
      {
        $set: {
          technicalReview: false,
          technicalReviewDay: req.body.technicalReviewDay,
          technicalReviewMonth: req.body.technicalReviewMonth,
        },
      }
    );
    return res.status(200).send("OK");
  } catch (err) {
    console.log(err);
  }
};

module.exports = { setTechnicalReview };
