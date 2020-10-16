const projects = require("../../Models/projectshema");

//FUNCTION TO DISPLAY PROJECT
module.exports = {
  getAllproject: () => {
    return new Promise(async (resolve, reject) => {
      let project = await projects.find({});
      resolve(project);
    });
  },
};
