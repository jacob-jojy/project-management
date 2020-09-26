var express = require("express");
var router = express.Router();
var mongo = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";
const bcrypt = require("bcrypt");
const app = require("../app");

const salt = 10;

/*user array*/

users = [];

router.get("/", (req, res) => {
  res.render("index");
});
router.post("/", (req, res) => {
  const hashedPassword = bcrypt.hash(req.body.password, salt, (err, hash) => {
    if (err) throw err;
    const user = { username: req.body.login, password: hash };
    users.push(user);
    console.log(users);
  });
});
module.exports = router;
