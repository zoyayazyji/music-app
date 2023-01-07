const express = require('express');
const TrackHistory = require('../models/TrackHistory');
const router = express.Router();
const auth = require('../middleware/auth');


router.post("/", auth, async (req, res) => {
  
  const history = new TrackHistory({
    user: req.user._id,
    datetime: new Date().toISOString(),
    ...req.body
  });
  try {
    await history.save();
    res.send(history);
  } catch (err) {
    console.log(err);
    res.status(400).send({ err });
  }
});

router.get("/", async (req, res) => {
  
  try {
    let history = await TrackHistory.find()
    if (req.query.user ) {
      history = await TrackHistory.find({ user: req.query.user }).sort( { datetime : -1} ).populate("track artist");
    }
    res.send(history);
  }catch (err) {
    res.sendStatus(404);
  }
});

module.exports = router;