const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/auth.routes");
const mysqlConnection = require("./config/db.config");
const mongoDBConnection = require("./config/mongoDB.config");

require("dotenv").config();

const app = express();

mysqlConnection.connect();

mongoDBConnection.connect();

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);

app.get("/api/test", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
