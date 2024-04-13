const User = require("../models/user.model");

const createBoard = async (req, res) => {
  try {
    const { title, columns } = req.body;

    if (!title) {
      return res
        .status(400)
        .json({ message: "Title is required for the board." });
    }

    const board = { title, columns };

    req.user.boards.push(board);

    await req.user.save();

    res.status(201).json({ message: "Board created successfully", board });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error: error });
  }
};

module.exports = { createBoard };
