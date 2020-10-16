var express = require("express");
const isLoggedIn = require("../../AuthController/authController").verifyLoggin;
const isAdmin = require("../../AuthController/authController").isAdmin;
var router = express.Router();
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
var users = require("../../Models/userschema");
/* GET users listing. */

router.get("/", isLoggedIn, async (req, res) => {
  user = await users.findOne({ _id: req.user.userid });
  if (user.role == "admin") {
    res.render("index");
  } else {
    res.render("user/login");
  }
});
module.exports = router;
