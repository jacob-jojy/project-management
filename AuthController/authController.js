const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const users = require("../Models/userschema");
const projects = require("../Models/projectshema");
//CHECKING IS LOGGEDIN
verifyLoggin = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access denied");
  try {
    const verified = jwt.verify(token, process.env.code);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

//CHECKING IS ADMIN

isAdmin = async (req, res, next) => {
  const token = req.header("auth-token");
  try {
    const user = jwt.verify(token, process.env.code);
    req.user = user;
    person = await users.findOne({ _id: req.user.userid });
    if (person.role == "admin") {
      next();
    } else {
      return res.status(401).send("Access denied");
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

//ACCESS CONTROL
canViewProject = async (req, res, next) => {
  const token = req.header("auth-token");
  try {
    const user = jwt.verify(token, process.env.code);
    req.user = user;
    const invitee = await projects.findOne({
      user: { $elemMatch: { $eq: req.user.userid } },
    });
    if (req.user.role == "admin" || invitee) {
      res.send(invitee);
      next();
    } else {
      res.status(401).json({ status: false, message: "not an inviteee" });
    }
  } catch (error) {
    res.json({ status: false, message: error });
  }
};
module.exports = { verifyLoggin, isAdmin, canViewProject };
