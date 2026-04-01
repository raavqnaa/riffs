import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import TrackLists from "./components/TrackLists";
import Player from "./components/Player";

const audioPlayer = new Audio();

function App() {
  const [tracks, setTracks] = useState([]); //список всех треков с сервера

  const [currentTrack, setCurrentTrack] = useState(null); // текущий трек
  const [isPlaying, setIsPlaying] = useState(false); //играет ли сейчас музыка

  const [currentTime, setCurrentTime] = useState(0); // Прошло секунд
  const [duration, setDuration] = useState(0); // Всего секунд
  // ползунок
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

        <TrackLists
          tracks={tracks}
          playTrack={playTrack}
          currentTrack={currentTrack}
          isPlaying={isPlaying}
        />

        {currentTrack && (
          <Player
            duration={duration}
            isPlaying={isPlaying}
            currentTime={currentTime}
            currentTrack={currentTrack}
            audioPlayer={audioPlayer}
            setCurrentTime={setCurrentTime}
            formatTime={formatTime}
            playTrack={playTrack}
          />
        )}
      </div>
    </>
  );
}

export default App;
