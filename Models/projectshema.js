const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  type: {
    type: String,
  },
  status: {
    type: String,
  },
  role: {
    type: String,
    default: "developer",
    enum: ["developer", "admin"],
  },
  StartDate: {
    type: Date,
    default: Date.now,
  },
  endtDate: {
    type: Date,
  },
});
module.exports = mongoose.model("project", projectSchema);
