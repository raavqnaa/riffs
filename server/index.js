// eslint-disable-next-line no-undef
const express = require("express");
// eslint-disable-next-line no-undef
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const tracks = [
  {
    id: 1,
    title: "Track 1",
    artist: "G-Eazy & Halsey - Him & I",
    src: "http://localhost:5000/songs/track1.mp3",
  },
  {
    id: 2,
    title: "Track 2",
    artist: "Juice WRLD - Lucid Dreams",
    src: "http://localhost:5000/songs/track2.mp3",
  },
  {
    id: 3,
    title: "Track 3",
    artist: "Justin Timberlake - Mirrors",
    src: "http://localhost:5000/songs/track3.mp3",
  },
];

app.get("/", (req, res) => {
  res.send("Server is working 🚀");
});

app.get("/tracks", (req, res) => {
  res.json(tracks);
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
