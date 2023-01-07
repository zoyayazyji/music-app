const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');
const Schema = mongoose.Schema;

const TrackHistorySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  track: {
    type: Schema.Types.ObjectId,
    ref: "Track",
    required: true
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: "Artist",
    required: true
  },
  datetime: {
    type: String,
    required: true
  }
});


TrackHistorySchema.plugin(idValidator, {
  message: "Invalid data"
});

const TrackHistory = mongoose.model("TrackHistory", TrackHistorySchema);
module.exports = TrackHistory;