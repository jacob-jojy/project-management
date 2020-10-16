const users = require("../../Models/userschema");
const express = require("express");
const router = express.Router();
const sendEmail = require("../../services/email.js");
const { NotExtended } = require("http-errors");
router.get("/", (req, res) => {
  res.render("forgot");
});
module.exports = async (req, res) => {
  try {
    //get user based on entered email address
    const user = await users.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "There is no user with this email id" });
    }

    //generate token
    const resetToken = user.createPasswordToken();
    await user.save();

    //send mail

    const resetURL = `${req.protocol}://${req.get("host")}/reset/${resetToken}`;

    const message = `Forgote your passsword? Submit a PATCH request with your new password and passwordconfirm to: ${resetURL}.\n If you didn't forget your password, plese ignore this email`;

    await sendEmail({
      email: user.email,
      subject: "Your password reset token (valid for 10 min)",
      message,
    });
    res.status(200).json({
      status: "success",
      message: "Token sent to email",
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: "Thre is an error in sending mail",
    });
  }
};
