const express = require("express");
const router = express.Router();
const boardController = require("../controller/board.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/createBoard", authMiddleware, boardController.createBoard);
router.delete(
  "/deleteBoard/:boardId",
  authMiddleware,
  boardController.deleteBoard
);

module.exports = router;