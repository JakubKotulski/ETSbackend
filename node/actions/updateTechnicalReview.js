const User = require("../models/User");

const updateTechnicalReview = async (req, res) => {
  try {
    await User.updateOne(
      { _id: req.user._id },
      {
        $set: {
          technicalReview: true,
          technicalReviewDay: req.body.technicalReviewDay,
          technicalReviewMonth: req.body.technicalReviewMonth,
        },
      }
    );
    await User.updateOne({ username: "Hamdam" }, { $inc: { companyBalance: -2500 } });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { updateTechnicalReview };
