const users = require("./schema");
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

    const user = await users.findOne({
      email: req.body.login,
    });
    if (!user)
      res.status(404).json({
        status: false,
        message: "User does not exist",
      });

    const pwdMatch = await bcrypt.compare(req.body.password, user.password);
    if (!pwdMatch)
      return res.status(401).json({
        status: false,
        message: "Password Incorrect",
      });
    const token = jwt.sign(
      { userid: user._id, email: user.email },
      process.env.code
    );

    return res.json({
      status: true,
      data: { token },
    });
  } catch (err) {
    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      data: err,
    });
  }
};