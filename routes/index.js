var express = require("express");
var router = express.Router();
var mongo = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";
const bcrypt = require("bcrypt");
const app = require("../app");
const db = require("../dbconfig/dbconnection");
const salt = 10;

/*user array to save users data*/

users = [];
/*hashing the user entered password*/

router.get("/", (req, res) => {
  res.render("index");
});
router.post("/", (req, res) => {
  const hashedPassword = bcrypt.hash(req.body.password, salt, (err, hash) => {
    if (err) throw err;
    const user = { username: req.body.login, password: hash };
    users.push(user);
    db.get()
      .collection("users")
      .insertOne(user, (err, data) => {
        if (err) throw err;
      });
  });
});
/*compare the hashed password and user entered password*/
router.post("/login", (req, res) => {});

module.exports = router;
