const express = require("express");
const router = express.Router();
const projects = require("../../Models/projectshema");

module.exports = async (req, res, next) => {
  try {
    const project = await (
      await projects.findOne({ _id: req.params.id })
    ).populate("user");
    console.log(req.params.id);
    res.json(project);
    next();
  } catch (error) {
    return res.sendStatus(400).json({ status: "false" });
  }
};
