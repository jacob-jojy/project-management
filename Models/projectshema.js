const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
  },
  role: {
    type: String,
  },
  user: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  StartDate: {
    type: Date,
    default: Date.now,
  },
  dueDate: {
    type: Date,
  },
});
module.exports = mongoose.model("project", projectSchema);
