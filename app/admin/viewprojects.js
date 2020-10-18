const projects = require("../../Models/projectshema");
const users = require("../../Models/userschema");

//FUNCTION TO DISPLAY PROJECT
module.exports = {
  getAllproject: () => {
    return new Promise(async (resolve, reject) => {
      let project = await projects.find({}).populate("user");
      console.log(project);
      resolve(project);
    });
  },
};
