import React from "react";

export default function Player({
  duration,
  currentTime,
  currentTrack,
  audioPlayer,
  setCurrentTime,
  formatTime,
  playTrack,
  isPlaying,
}) {
  return (
    <>
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
              // eslint-disable-next-line react-hooks/immutability
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
    </>
  );
}
