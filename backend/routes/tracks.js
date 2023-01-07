const express = require('express');
const Track = require('../models/Track');
const router = express.Router();
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");


router.post("/", async (req, res) => {
  const track = new Track(req.body);
  try {
    await track.save();
    res.send(track);
  } catch (err) {
    res.sendStatus(400);
  }
});


router.get("/", async (req, res) => {
  try {
    let albums = await Track.find()
    if (req.query.album ) {
      
      albums = await Track.find({ album: req.query.album, published: true}).sort( { relise : 1} ).populate("album");
    }
    if (req.query.published) {
      albums = await Track.find({ published: req.query.published }).populate("album");
    }
    res.send(albums);
  }catch (err) {
    res.sendStatus(404);
  }
});

router.patch("/:id", async (req, res) => {
  let item = await Track.findById(req.params.id);
  if (!item) return res.status(404).send({ error: "Track not Found" });
  item.published = true
  try {
    await item.save();
  } catch (e) {
    return res.status(502).send(e);
  }
  res.status(201).send(item);
});

router.delete("/:id", auth, permit("admin"), async (req, res) => {
  try {
    await Track.deleteOne({ _id: req.params.id })
    res.sendStatus(204)
  } catch (e) {
    return res.status(502).send(e)
  }
});


module.exports = router;