const express = require("express");
const cors = require("cors");
const { connect } = require("./config/db.config");
const authRouter = require("./routes/auth.routes");
const boardRouter = require("./routes/board.routes");

require("dotenv").config();

const app = express();

connect();

const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/board", boardRouter);

app.listen(port, (err) => {
  if (err) throw new Error(err);

  console.log(`Server is running on http://localhost:${port}`);
});
