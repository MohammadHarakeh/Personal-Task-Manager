const User = require("../models/user.model");

const createBoard = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res
        .status(400)
        .json({ message: "Title is required for the board." });
    }

    const defaultColumns = [
      { title: "To Do", tasks: [] },
      { title: "In Progress", tasks: [] },
      { title: "Done", tasks: [] },
    ];

    const board = {
      title,
      columns: defaultColumns,
    };

    req.user.boards.push(board);

    await req.user.save();

    res.status(201).json({ message: "Board created successfully", board });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error: error });
  }
};

const createTask = async (req, res) => {
  const { boardId, columnId, title, description } = req.body;
  try {
    const user = await User.findById(req.user._id);

    const board = user.boards.id(boardId);

    const column = board.columns.id(columnId);

    const newTask = {
      title,
      description,
    };

    column.tasks.push(newTask);

    user.save();

    const createdTask = column.tasks[column.tasks.length - 1];

    return res.status(201).json({
      message: "Task created successfully",
      task: { columnId, ...createdTask._doc },
    });
  } catch (error) {
    console.log(error);
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

    const todos = [
      { title: "To Do", cards: [] },
      { title: "In Progress", cards: [] },
      { title: "Done", cards: [] },
    ];

    board.columns.forEach((column) => {
      const todoColumn = todos.find((todo) => todo.title === column.title);
      if (todoColumn) {
        todoColumn.cards = column.tasks.map((task) => ({
          id: task._id,
          text: task.title,
        }));
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

module.exports = {
  createBoard,
  deleteBoard,
  getBoard,
  getTodoBoard,
  createTask,
};
