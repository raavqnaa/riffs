import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const audioPlayer = new Audio();

function App() {
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playTrack = (track) => {
    if (currentTrack?.id === track.id) {
      // Если нажали на тот же трек — ставим на паузу или играем снова
      if (isPlaying) {
        audioPlayer.pause();
        setIsPlaying(false);
      } else {
        audioPlayer.play();
        setIsPlaying(true);
      }
    } else {
      // Если новый трек — меняем источник и запускаем
      setCurrentTrack(track);
      // eslint-disable-next-line react-hooks/immutability
      audioPlayer.src = track.src;
      audioPlayer.play();
      setIsPlaying(true);
    }
  };
  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/tracks");
        setTracks(res.data);
        console.log(res);
      } catch (err) {
        console.log("Error", err);
      }
    };
    fetchTracks();
  }, []);

  return (
    <>
      <div className="appContainer">
        <header>
          <h1>Riffs</h1>
          <p style={{ color: "#888" }}>Music</p>
        </header>

        <div className="track-list">
          {tracks.map((track) => (
            <div
              key={track.id}
              onClick={() => playTrack(track)}
              className="track-id"
            >
              <div className="track-info">
                <h3>{track.title}</h3>
                <h3>{track.artist}</h3>
              </div>
              <button className="play-btn">
                {currentTrack?.id === track.id && isPlaying ? "⏸" : "▶"}
              </button>
            </div>
          ))}
        </div>
        {currentTrack && (
          <div className="mini-player">
            <div className="track-info">
              <h3>{currentTrack.title}</h3>
              <p>{currentTrack.artist}</p>
            </div>
            <button
              className="play-btn"
              onClick={() => playTrack(currentTrack)}
            >
              {isPlaying ? "⏸" : "▶"}
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
