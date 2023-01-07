const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"]
  },
  relise: String,
  artist: {
    type: Schema.Types.ObjectId,
    ref: "Artist",
    required: [true, "Artist is required"]
  },
  image: String,
  published: {
    type: String,
    required: true,
    default: false,
    enum: [true, false]
  }
});

AlbumSchema.plugin(idValidator, {
  message: "No artist with this ID"
});

const Album = mongoose.model("Album", AlbumSchema);
module.exports = Album;