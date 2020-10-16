var express = require("express");
var users = require("../../Models/userschema");
const isLoggedIn = require("../../AuthController/authController").verifyLoggin;
const isAdmin = require("../../AuthController/authController").isAdmin;
const addUser = require("../../app/admin/addUsers");
const viewproject = require("../../app/admin/viewprojects");
var router = express.Router();

/* GET users listing. */

router.get("/", isLoggedIn, async (req, res) => {
  user = await users.findOne({ _id: req.user.userid });
  if (user.role == "admin") {
    viewproject.getAllproject().then((project) => {
      res.render("index", { project });
    });
  } else {
    res.render("user/login");
  }
});
router.get("/addUser", isAdmin, (req, res) => {
  res.render("admin/adduser");
});
router.post("/addUser", addUser, (req, res) => {});
module.exports = router;
