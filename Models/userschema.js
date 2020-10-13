const mongoose = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const users = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    sparse: true,
    match: [/\S+@\S+\.\S+/, "Please fill a valid email address"],
    required: true,
  },
  password: {
    type: String,
    required: [true, "please enter your password"],
  },
  passwordConfirm: {
    type: String,
  },
  role: {
    type: String,
    default: "developer",
    enum: ["developer", "admin"],
  },
  accessToken: {
    type: String,
  },
  resetPasswordTime: Date,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});
///////////////////////////////////////////////////////////////
users.pre("save", function (next) {
  var user = this;
  var SALT_FACTOR = 10; // 12 or more for better security

  if (!user.isModified("password")) return next();

  console.log(user.password); // Check accident password update

  bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      console.log(user.password);
      next();
    });
  });
});
//////////////////////////////////////////////////////////////////////////

users.methods.createPasswordToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  console.log({ resetToken }, this.resetPasswordToken);
  this.resetPasswordExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};
module.exports = mongoose.model("users", users);
