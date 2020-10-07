const users = require("../../Models/userschema");
const crypto = require("crypto");
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { NotExtended } = require("http-errors");
router.get("/", (req, res) => {
  res.render("reset");
});
module.exports = async (req, res, next) => {
  try {
    //get user based on token
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await users.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Token is Invalid or has Expired" });
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    const token = jwt.sign(
      { userid: user._id, email: user.email },
      process.env.code
    );

    return res.json({
      status: true,
      data: { token },
    });
  } catch (err) {}
};
