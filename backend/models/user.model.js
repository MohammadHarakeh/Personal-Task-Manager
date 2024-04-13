const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

const columnSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  tasks: [taskSchema],
});

const boardScheema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  columns: [columnSchema],
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: false,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  boards: [boardScheema],
});

module.exports = mongoose.model("User", userSchema);
