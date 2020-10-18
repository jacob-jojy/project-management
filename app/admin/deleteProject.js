const projects = require("../../Models/projectshema");
module.exports = async (req, res, next) => {
  try {
    const project = await projects.findByIdAndDelete(req.params.id);
    res.status("200").json({
      status: "success,ProjectDeleted",
      data: project,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: "updation failed",
    });
  }
};
