const express = require("express");
const router = express.Router();

const User = require("../models/user");

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/signIn", (req, res) => {
  return res.render("signIn");
});

router.get("/logout",(req,res)=>{
  res.clearCookie("token").redirect("/")
})

router.post("/signIn", async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await User.matchPasswordandGeneateToken(email, password);
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("signIn", {
      error : "incorrect email or password",
    });
  }
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
