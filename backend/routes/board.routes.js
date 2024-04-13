const express = require("express");
const router = express.Router();
const boardController = require("../controller/board.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/createBoard", authMiddleware, boardController.createBoard);

module.exports = router;
