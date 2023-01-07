const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth");
const router = express.Router();
const {nanoid} = require("nanoid");

router.post('/', async (req, res) => {
  const user = new User(req.body);
  try {
    user.generateToken();
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/session", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  const errorMessage = { message: "Username or password are invalid" };
  if (!user) return res.status(401).send(errorMessage);
  const isMatch = await user.checkPassword(req.body.password);
  if (!isMatch) return res.status(401).send(errorMessage);
  user.generateToken();
  await user.save();
  res.send (user)
});

router.delete("/session", auth, async (req, res) => {
  req.user.token = nanoid();
  try {
      await req.user.save();
      res.sendStatus(204);
  } catch(e) {
      res.status(502).send({message: "Failed to log out"});
  }
});


module.exports = router;