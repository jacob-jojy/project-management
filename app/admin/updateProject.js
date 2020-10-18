const projects = require("../../Models/projectshema");
module.exports = async (req, res, next) => {
  try {
    const project = await projects.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status("200").json({
      status: "success,Project Updated",
      data: project,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: "updation failed",
    });
  }
};
