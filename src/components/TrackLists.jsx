import React from "react";

export default function TrackLists({
  tracks,
  playTrack,
  currentTrack,
  isPlaying,
}) {
  return (
    <>
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
    </>
  );
}
