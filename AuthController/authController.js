const jwt = require("jsonwebtoken");
const users = require("../Models/userschema");

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

isAdmin = (req, res, next) => {
  const token = req.header("auth-token");
  try {
    const user = jwt.verify(token, process.env.code);
    req.user = user;
    if (!req.user.role == "admin") {
      return res.status(401).send("Access denied");
    } else {
      next();
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
module.exports = { verifyLoggin, isAdmin };
//dummy data////

//To granting access
/*const { roles } = require("../../services/roles.js");

exports.grantAccess = function (action, resource) {
  return async (req, res, next) => {
    try {
      const permission = roles.can(req.user.role)[action](resource);
      if (!permission.granted) {
        return res.status(401).json({
          error: "You don't have enough permission to perform this action",
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

//To check the user is logged in
exports.allowIfLoggedin = async (req, res, next) => {
  try {
    const user = res.locals.loggedInUser;
    if (!user)
      return res.status(401).json({
        error: "You need to be logged in to access this route",
      });
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
*/
