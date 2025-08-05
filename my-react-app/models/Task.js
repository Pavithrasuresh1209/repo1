const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  description: String,
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
});

module.exports = mongoose.model("Task", taskSchema);
