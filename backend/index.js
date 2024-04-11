const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/auth.routes");

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);

app.get("/api/test", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
