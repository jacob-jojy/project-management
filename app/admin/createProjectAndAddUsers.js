const projects = require("../../Models/projectshema");
const users = require("../../Models/userschema");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

//FUNCTION TO ADD USER
module.exports = async (req, res, next) => {
  try {
    const { name, description, role, users, startDate, dueDate } = req.body;

    const project = await projects.create(req.body);
    return res.json({
      status: true,
      result: project.length,
      message: "project added successfully",
      data: project,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,

      message: "Some error Occured",
      error: error,
    });
  }
};
