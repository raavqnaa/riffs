import { useEffect, useState } from "react";

import "./App.css";
import axios from "axios";

function App() {
  const [tracks, setTracks] = useState([]);

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
            <div key={track.id} className="track-id">
              <div className="track-info">
                <h3>{track.title}</h3>
                <h3>{track.artist}</h3>
              </div>
              <button
                className="play-btn"
                onClick={() => alert(`Играем ${track.title}`)}
              >
                ▶
              </button>
            </div>
          ))}
        </div>
        <div className="mini-player">
          <div className="track-info">
            <h3>Ничего не выбрано</h3>
            <p>Нажми Play</p>
          </div>
          <button className="play-btn">Ⅱ</button>
        </div>
      </div>
    </>
  );
}

export default App;
