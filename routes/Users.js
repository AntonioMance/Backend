const express = require("express");
const router = express.Router();
const User = require("../schemas/User");
const { v4: uuidv4 } = require("uuid");



router.post("/register", async (req, res) => {
  let emailExists = await User.findOne({ email: req.body.email });
  let usernameExists = await User.findOne({ email: req.body.username });

  if (!(emailExists || usernameExists)) {
    let user = new User();
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;

    await user.save();
    return res.status(200).json({ message: "Registration successful" });
  } else {
    return res
      .status(406)
      .json({ message: "Email or username already exists" });
  }
});

router.patch("/login", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(401).json({ message: "Unauthorized" });

  if (req.body.password == user.password) {
    user.loginToken = uuidv4();

    await user.save();

    return res
      .cookie("loginToken", user.loginToken, { sameSite: "none", secure: true })
      .cookie("email", user.email, { sameSite: "none", secure: true })
      .cookie("username", user.username, { sameSite: "none", secure: true })
      .status(200)
      .json({
        message: "OK",
        cookies: {
          loginToken: user.loginToken,
          email: user.email,
          username: user.username,
        },
      });

  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
});

module.exports = router;
