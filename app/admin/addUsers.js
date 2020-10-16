const projects = require("../../Models/projectshema");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

//FUNCTION TO ADD USER
module.exports = async (req, res, next) => {
  try {
    const { name, description, role, users, startDate, dueDate } = req.body;

    const project = new projects({
      name: req.body.name,
      description: req.body.description,
    });
    const response = await project.save();

    if (response)
      return res.json({
        status: true,
        message: "project added",
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
