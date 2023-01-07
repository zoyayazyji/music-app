const mongoose = require("mongoose");
const { nanoid } = require("nanoid");
const Album = require("./models/Album");
const Artist = require("./models/Artist");
const Track = require("./models/Track");
const TrackHistory = require("./models/TrackHistory");
const User = require("./models/User");

mongoose.connect("mongodb://localhost/LastFM", { useNewUrlParser: true })

const connection = mongoose.connection;

connection.once('open', async () => {
  try {
    await connection.dropCollection("artists");
    await connection.dropCollection("albums");
    await connection.dropCollection("tracks");
    await connection.dropCollection("tracksHistories");
    await connection.dropCollection("users");
  } catch (e) {
    console.log("Skipping drop");
  }

  const [MadonnaArtist, JacksonArtist, StingArtist, AdeleArtist] = await Artist.create({
    name: "Madonna",
    image: "madonna.jpg",
    information: "American singer, songwriter, dancer, music producer, as well as actress, director and children's writer",
    published: true
  }, {
    name: "Michael Jackson",
    image: "jackson.png",
    information: "American singer, songwriter, record producer, arranger, dancer, choreographer, actor, screenwriter, philanthropist and entrepreneur",
    published: true
  },
    {
      name: "Sting",
      image: "sting.jpg",
      information: "British musician-multi-instrumentalist, singer and songwriter, actor, public figure and philanthropist",
      published: true
    },
    {
      name: "Adele",
      image: "adele.jpg",
      information: "British singer, songwriter and poet, winner of 15 Grammy Awards and the first musician to win in the categories 'Album of the Year', 'Record of the Year' and 'Song of the Year' twice",
      published: false
    }
    );

  const [VirginAlbum, MadamAlbum, DangerousAlbum, SoulAlbum] = await Album.create({
    title: "Like a virgin",
    artist: MadonnaArtist._id,
    image: "like-a-virgin.jpg",
    published: false
  }, {
    title: "Madam X",
    artist: MadonnaArtist._id,
    image: "Madame_X.png",
    published: true
  },
    {
      title: "Dangerous",
      artist: JacksonArtist._id,
      image: "dangerous.jpg",
      published: true
    },
    {
      title: "He Soul Cages",
      artist: StingArtist._id,
      image: "soul.jpg",
      published: true
    }
  );

  const [IslandTrack, MadTrack, AngelTrack, PretenderTrack, CrazyTrack, FutureTrack, RememberTrack] = await Track.create(
    {
    number: 1,
    title: "Island of Souls",
    album: SoulAlbum._id,
    duration: "5:02",
    published: true
  },
   {
    number: 2,
    title: "Mad About You",
    album: SoulAlbum._id,
    duration: "3:52",
    published: false
  },
    {
      number: 1,
      title: "Crazy",
      album: MadamAlbum._id,
      duration: "4:02",
      published: true
    },
    {
      number: 2,
      title: "Future",
      album: MadamAlbum._id,
      duration: "3:52",
      published: false
    },
    {
      number: 1,
      title: "Remember the Time",
      album: DangerousAlbum._id,
      duration: "3:22",
      published: true
    }
  );

  const [user, admin] = await User.create({
    username: "user123",
    password: "123",
    token: nanoid(),
    role: "user"
  }, {
    username: "admin123",
    password: "123",
    token: nanoid(),
    role: "admin"
  });

  await TrackHistory.create({
    user: user._id,
    track: IslandTrack._id,
    artist: MadonnaArtist._id,
    datetime: "2022-09-28T06:32:49.202Z"
  },
    {
      user: admin._id,
      track: IslandTrack._id,
      artist: MadonnaArtist._id,
      datetime: "2022-10-11T02:12:39.202Z"
    }
  );

  connection.close();
});
