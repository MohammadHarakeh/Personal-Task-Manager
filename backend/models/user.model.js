const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const columnSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  tasks: [taskSchema],
});

const boardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  columns: [columnSchema],
});

const userSchema = new mongoose.Schema({
  username: { type: String, unique: false, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  boards: [boardSchema],
});

module.exports = mongoose.model("User", userSchema);
