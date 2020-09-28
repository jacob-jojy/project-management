const express = require("express");
const router = express.Router();

const login = require("../app/users/login");
const register = require("../app/users/register");

router.get("/", (req, res) => {
  res.render("index");
});

router.post("/login", login);
router.post("/register", register);

module.exports = router;
