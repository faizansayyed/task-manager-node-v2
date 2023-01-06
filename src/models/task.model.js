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
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

taskSchema.plugin(toJSON);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
