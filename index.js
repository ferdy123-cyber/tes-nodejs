const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;
const { sequelize } = require("./database/models");

const userRouter = require("./routes/user");
const postRouter = require("./routes/post");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));

app.use("/auth", userRouter);
app.use("/post", postRouter);

sequelize.authenticate().then(() => {
  console.log("success connect database");
});

app.use((error, req, res, next) => {
  return res.status(400).send({
    status: "error",
    code: 400,
    message: error.message,
  });
});

app.listen(port, () => {
  console.log(`server running on ${port}`);
});
