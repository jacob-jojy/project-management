var express = require("express");
var users = require("../../Models/userschema");
const isLoggedIn = require("../../AuthController/authController").verifyLoggin;
const isAdmin = require("../../AuthController/authController").isAdmin;
const addProject = require("../../app/admin/createProjectAndAddUsers");
const viewproject = require("../../app/admin/viewprojects");
var router = express.Router();

/* GET users listing. */

router.get("/", async (req, res) => {
  // user = await users.findOne({ _id: req.user.userid });
  //if (user.role == "admin") {
  viewproject.getAllproject().then((project) => {
    const developers = project[0].user;

    res.render("index", { project, developers });
  });
  // } else {
  //  res.render("user/login");
  // }
});
router.get("/addProject", isAdmin, (req, res) => {
  res.render("admin/adduser");
});
router.post("/addProject", addProject, (req, res) => {});
module.exports = router;
