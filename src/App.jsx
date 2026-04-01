import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const audioPlayer = new Audio();

function App() {
  const [tracks, setTracks] = useState([]); //список всех треков с сервера

  const [currentTrack, setCurrentTrack] = useState(null); // текущий трек
  const [isPlaying, setIsPlaying] = useState(false); //играет ли сейчас музыка

  const [currentTime, setCurrentTime] = useState(0); // Прошло секунд
  const [duration, setDuration] = useState(0); // Всего секунд

  useEffect(() => {
    const updateDuration = () => setDuration(audioPlayer.duration);
    audioPlayer.addEventListener("loadedmetadata", updateDuration);

    // Добавляем интервал для подстраховки, если timeupdate тупит
    const interval = setInterval(() => {
      if (isPlaying) {
        setCurrentTime(audioPlayer.currentTime);
      }
    }, 500); // Обновляем каждые полсекунды

    return () => {
      audioPlayer.removeEventListener("loadedmetadata", updateDuration);
      clearInterval(interval);
    };
  }, [isPlaying]);

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

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
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
          <div
            className="mini-player"
            style={{ flexDirection: "column", gap: "10px" }}
          >
            {/* Ползунок */}
            <div className="progress-container" style={{ width: "100%" }}>
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={(e) => {
                  const time = Number(e.target.value);
                  audioPlayer.currentTime = time;
                  setCurrentTime(time);
                }}
                style={{ width: "100%", cursor: "pointer" }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "10px",
                  marginTop: "-5px",
                }}
              >
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Инфо и Кнопка в одну строку */}
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div className="track-info">
                <h3 style={{ fontSize: "14px" }}>{currentTrack.title}</h3>
                <p style={{ fontSize: "12px", color: "#888" }}>
                  {currentTrack.artist}
                </p>
              </div>
              <button
                className="play-btn"
                onClick={(e) => {
                  e.stopPropagation(); // Чтобы не срабатывал клик по родителю
                  playTrack(currentTrack);
                }}
              >
                {isPlaying ? "⏸" : "▶"}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
