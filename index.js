const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const userRouter = require("./routes/user");

const app = express();
const PORT = 8000;

mongoose
  .connect("mongodb://127.0.0.1:27017/shikshavartha")
  .then(() => console.log("mongoose started"))
  .catch((error) => console.log("error", error));

app.use(express.urlencoded({extended : false}))

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", (req, res) => {
  res.render("home");
});

app.use("/user", userRouter);

app.listen(PORT, () => console.log(`Server started at ${PORT}`));
