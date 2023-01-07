const multer = require('multer');
const express = require('express');
const Album = require('../models/Album');
const Track = require('../models/Track');
const { nanoid } = require('nanoid');
const path = require('path');
const configAlbum = require('../configAlbum');
const router = express.Router();
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, configAlbum.uploadPath)
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname))
  }
});

const upload = multer({ storage });


router.post("/", upload.single("image"), async (req, res) => {
  const album = new Album(req.body);
  if (req.file) {
    album.image = req.file.filename;
  }
  try {
    await album.save();
    res.send(album);
  } catch (err) {
    res.sendStatus(400);
  }
});

router.get("/", async (req, res) => {
  try {
    let albums = await Album.find()
    if (req.query.artist ) {
      
      albums = await Album.find({ artist: req.query.artist, published: true}).sort( { relise : 1} ).populate("artist");
    }
    if (req.query.published) {
      albums = await Album.find({ published: req.query.published })
    }
    res.send(albums);
  }catch (err) {
    res.sendStatus(404);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const album = await Album.findById(req.params.id).populate("artist");
    if(!album) return res.status(404).send({ err: 'Album not found' });
    res.send(album)
  } catch (err) {
    res.sendStatus(404);
  }
});

router.patch("/:id", async (req, res) => {
  let item = await Album.findById(req.params.id);
  if (!item) return res.status(404).send({ error: "Album not Found" });
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
    await Track.deleteMany({album: req.params.id})
    await Album.deleteOne({ _id: req.params.id })
    res.sendStatus(204)
  } catch (e) {
    return res.status(502).send(e)
  }
});

module.exports = router;