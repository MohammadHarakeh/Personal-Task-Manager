const User = require("../models/user.model");

const createBoard = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res
        .status(400)
        .json({ message: "Title is required for the board." });
    }

    const board = {
      title,
      columns: [],
    };

    req.user.boards.push(board);

    await req.user.save();

    res.status(201).json({ message: "Board created successfully", board });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error: error });
  }
};

const getBoard = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const boards = user.boards;

    res.status(200).json({ message: "Baords retrieved successfully", boards });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error: error });
  }
};

const getTodoBoard = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const boardId = req.params.boardId;

    const board = user.boards.find((board) => board._id.toString() === boardId);

    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    const todos = [];

    board.columns.forEach((column) => {
      if (
        column.title === "To Do" ||
        column.title === "In Progress" ||
        column.title === "Done"
      ) {
        if (column.tasks && Array.isArray(column.tasks)) {
          todos.push(...column.tasks);
        }
      }
    });

    res.status(200).json({ message: "Todos retrieved successfully", todos });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error: error });
  }
};

const deleteBoard = async (req, res) => {
  try {
    const boardId = req.params.boardId;

    const index = req.user.boards.findIndex(
      (board) => board._id.toString() === boardId
    );

    if (index === -1) {
      return res.status(404).json({ message: "Board not found" });
    }

    req.user.boards.splice(index, 1);

    await req.user.save();

    res.status(200).json({ message: "Board deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error: error });
  }
};

module.exports = { createBoard, deleteBoard, getBoard, getTodoBoard };
