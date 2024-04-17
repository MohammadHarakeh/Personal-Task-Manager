const express = require("express");
const router = express.Router();
const boardController = require("../controller/board.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/getBoard", authMiddleware, boardController.getBoard);
router.get(
  "/getTodoBoard/:boardId",
  authMiddleware,
  boardController.getTodoBoard
);

router.post("/createBoard", authMiddleware, boardController.createBoard);
router.post("/addTask", authMiddleware, boardController.createTask);

router.delete(
  "/deleteBoard/:boardId",
  authMiddleware,
  boardController.deleteBoard
);

module.exports = router;
