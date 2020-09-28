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

router.get("/", (req, res) => {
  res.render("index");
});

/*hashing the user entered password and insert data into database*/

//-------------------------------------------------------------------------------------------------------------/

router.post("/", (req, res) => {
  const hashedPassword = bcrypt.hash(req.body.password, salt, (err, hash) => {
    if (err) throw err;
    const user = { username: req.body.login, password: hash };
    db.get()
      .collection("users")
      .insertOne(user, (err, data) => {
        if (err) throw err;
      });
  });
});

/*compare the hashed password and user entered password from database*/
//-----------------------------------------------------------------------------------------------------------//

router.post("/", (req, res) => {
  var username = req.body.login;
  var password = req.body.password;
  db.get()
    .collection("users")
    .find({ username: username })
    .toArray((err, user) => {
      if (err) console.log(err);
      if (!user[0]) {
        console.log("user not found");
        res.status(404).send("user not found");
      } else {
        let bool = bcrypt.compareSync(password, user[0].password);
        console.log(bool);
        if (bool == false) {
          res.status(400).send("OOPS!!!invalid password");
        } else {
          res.send("WELCOME " + username);
        }
      }
    });
});

module.exports = router;
