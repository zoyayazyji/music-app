const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator')
const Schema = mongoose.Schema;

const TrackSchema = new Schema({
  number: {
    type: Number,
    required: [true, "Track number is required"]
  },
  title: {
    type: String,
    required: [true, "Title is required"]
  },
  album: {
    type: Schema.Types.ObjectId,
    ref: "Album",
    required: [true, "Album is required"]
  },
  duration: String,
  published: {
    type: String,
    required: true,
    default: false,
    enum: [true, false]
  }
});

TrackSchema.plugin(idValidator, {
  message: "No album with this ID"
})

const Track = mongoose.model("Track", TrackSchema);
module.exports = Track;