const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/auth.routes");
// const mysqlConnection = require("./config/db.config");
const mongoDBConnection = require("./config/mongoDB.config");
const { connect } = require("./config/db.config");

require("dotenv").config();

const app = express();

const port = process.env.PORT;

connect();

// mysqlConnection.connect();

mongoDBConnection.connect();

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use(express.json());

app.get("/api/test", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

app.listen(port, (err) => {
  if (err) throw new Error(err);

  console.log(`Server is running on http://localhost:${port}`);
});
