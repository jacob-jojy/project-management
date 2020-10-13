const express = require("express");
const router = express.Router();

const login = require("../app/users/login");
const register = require("../app/users/register");
const forgot = require("../app/users/forgot");
const reset = require("../app/users/reset");

router.get("/", (req, res) => {
  res.render("user/login");
});

router.post("/login", login);
router.post("/register", register);
router.post("/forgot", forgot);
router.patch("/reset/:token", reset);

module.exports = router;
