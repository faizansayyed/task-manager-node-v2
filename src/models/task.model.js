const mongoose = require("mongoose");
const { toJSON } = require("./plugins");

const taskSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

taskSchema.plugin(toJSON);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
