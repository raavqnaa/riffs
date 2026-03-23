// eslint-disable-next-line no-undef
const express = require("express");
// eslint-disable-next-line no-undef
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const tracks = [
  { id: 1, title: "Track 1", artist: "Artist 1" },
  { id: 2, title: "Track 2", artist: "Artist 2" },
  { id: 2, title: "Track 2", artist: "Artist 2" },
  { id: 2, title: "Track 2", artist: "Artisывывt 2" },
  { id: 2, title: "Track 2", artist: "Artisывывt 2e" },
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
