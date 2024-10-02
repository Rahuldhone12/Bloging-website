const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookiePaser = require("cookie-parser");
const {
  checkForaAuthenticationCookie,
} = require("./middleware/authentication");

const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog");
const Blog = require("./models/blog");

const app = express();
const PORT = 8000;

mongoose
  .connect("mongodb://127.0.0.1:27017/shikshavartha")
  .then(() => console.log("mongoose started"))
  .catch((error) => console.log("error", error));

app.use(express.urlencoded({ extended: false }));
app.use(cookiePaser());
app.use(checkForaAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")))


app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});
  res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});

app.use("/user", userRouter);
app.use("/blog", blogRouter);

app.listen(PORT, () => console.log(`Server started at ${PORT}`));
