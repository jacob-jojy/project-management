const express = require("express");
const router = express.Router();
const isLoggedIn = require("../AuthController/authController").verifyLoggin;
const login = require("../app/users/login");
const register = require("../app/users/register");
const forgot = require("../app/users/forgot");
const reset = require("../app/users/reset");

router.get("/", (req, res) => {
  res.render("user/login");
});
router.get("/forgot", (req, res) => {
  res.render("user/forgot");
});
router.get("/reset/:token", (req, res) => {
  res.render("user/reset", { token: req.params.token });
});

router.post("/login", login, (req, res) => {
  res.render("index");
});

router.post("/register", register);
router.post("/forgot", forgot);
router.post("/reset/:token", reset);

module.exports = router;
