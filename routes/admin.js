var express = require("express");
var router = express.Router();
var users = require("../Models/userschema");
const verifyLoggin = require("../app/users/authController");
/* GET users listing. */
router.get("/", verifyLoggin, function (req, res, next) {
  res.send(req.user);
  //var details = users.findbyOne({ _id: req.user._id });
  //console.log(details);
});
module.exports = router;
