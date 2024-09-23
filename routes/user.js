const express = require("express");
const router = express.Router();

const User = require("../models/user");

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/signIn", (req, res) => {
  return res.render("signIn");
});

router.post("/signIn", async (req, res) => {
  const { email, password } = req.body;
  const user = User.matchPassword(email, password);
  console.log( "user", user );
  return res.redirect("/");
});

router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  await User.create({
    fullName,
    email,
    password,
  });

  return res.redirect("/user/signIn");
});

module.exports = router;
