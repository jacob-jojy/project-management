const express = require("express");
const router = express.Router();
const projects = require("../Models/projectshema");
const login = require("../app/users/login");
const register = require("../app/users/register");
const forgot = require("../app/users/forgot");
const reset = require("../app/users/reset");
const projectdetails = require("../app/dashboard/dashboard");
const { isAdmin } = require("../AuthController/authController");
const canviewproject = require("../AuthController/authController")
  .canViewProject;

router.get("/", (req, res) => {
  res.render("index");
});
router.get("/:projectid", canviewproject, (req, res) => {});
router.post("/:id", projectdetails, (req, res) => {});
router.post("/login", login);
router.post("/register", register);
router.post("/forgot", forgot);
router.patch("/reset/:token", reset);

module.exports = router;
