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

module.exports = { createBoard, deleteBoard };
