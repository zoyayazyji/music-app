const express = require("express");
const artists = require("./routes/artists");
const albums = require("./routes/albums");
const tracks = require("./routes/tracks");
const users = require("./routes/users");
const tracks_history = require("./routes/tracksHistory");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

const Port = 8000;

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use("/artists", artists);
app.use("/albums", albums);
app.use("/tracks", tracks);
app.use("/users", users);
app.use("/tracks_history", tracks_history);

const run = async () => {
  await mongoose.connect("mongodb://localhost/LastFM", { useNewUrlParser: true });

  console.log("Connected to mongo DB");
  app.listen(Port, () => {
    console.log(`Server started at http://localhost:${Port}`);
  });

  process.on("exit", () => {
    mongoose.disconnect();
  })
};

run().catch(console.log);