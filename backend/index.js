const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/auth.routes");
const { connect } = require("./config/db.config");
const app = express();
require("dotenv").config();
connect();
const port = process.env.PORT;

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
