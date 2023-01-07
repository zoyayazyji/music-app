const multer = require('multer');
const express = require('express');
const Artist = require('../models/Artist');
const Album = require('../models/Album');
const Track = require('../models/Track');
const { nanoid } = require('nanoid');
const path = require('path');
const configArtist = require('../configArtist');
const router = express.Router();
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, configArtist.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

router.get("/", async (req, res) => {
  try {
    let query;
    if (req.query.published) {
      query = {published: req.query.published};
    }
    const artists = await Artist.find(query)
    res.send(artists);
  } catch (err) {
    res.sendStatus(404);
  }
});

router.post("/", upload.single("image"), async (req, res) => {
  const artist = new Artist(req.body);
  if (req.file) {
    artist.image = req.file.filename;
  }
  try {
    await artist.save();
    res.send(artist);
  } catch (err) {
    res.sendStatus(400);
  }
});


router.patch("/:id", async (req, res) => {
  try {
    let item = await Artist.findById(req.params.id)
    item.published = true;
    await item.save();
    res.sendStatus(204)
  } catch (e) {
    return res.status(502).send(e)
  }
});


router.delete("/:id", auth, permit("admin"), async (req, res) => {
  try {
    await Album.deleteMany({artist: req.params.id})
    await Artist.deleteOne({ _id: req.params.id })
    res.sendStatus(204)
  } catch (e) {
    return res.status(502).send(e)
  }
});

module.exports = router;