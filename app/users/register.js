const users = require("../../Models/userschema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  try {
    //validation
    if (!req.body.login || !req.body.password)
      return res.status(400).json({
        status: false,
        message: "Validation Failed",
      });

    //Check user already exist
    const userExist = await users.findOne({ email: req.body.login });
    if (userExist)
      return res.status(409).json({
        status: false,
        message: "user already exist",
      });

    const { email, password, role } = req.body;
    //const hashpwd = await bcrypt.hash(req.body.password, salt);//
    const user = new users({
      email: req.body.login,
      password: req.body.password,
      role: role || "user",
    });
    const response = await user.save();

    if (response)
      return res.json({
        status: true,
        message: "Registered",
        data: user,
      });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: "Somethign went wrong",
      data: err,
    });
  }
};
