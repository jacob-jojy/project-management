const projects = require("../../Models/projectshema");
const users = require("../../Models/userschema");

//FUNCTION TO DISPLAY PROJECT
module.exports = {
  getAllproject: () => {
    return new Promise(async (resolve, reject) => {
      let project = await projects
        .find({})
        .populate({ path: "user", select: "-__v -role -password -date" });
      resolve(project);
    });
  },
};
