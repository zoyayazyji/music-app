const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  image: {
    type: String,
    required: [true, "Photo is required"]
  },
  information: String,
  published: {
    type: String,
    required: true,
    default: false,
    enum: [true, false]
  }
});

const Artist = mongoose.model("Artist", ArtistSchema);
module.exports = Artist;