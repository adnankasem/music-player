import React from "react";
import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa";

const AudioControls = ({
  isPlaying,
  onPlayPauseClick,
  onPrevClick,
  onNextClick,
}) => {
  return (
    <div className="audio-controls">
      <button
        type="button"
        className="prev"
        aria-label="Previous"
        onClick={onPrevClick}
      >
        <FaBackward />
      </button>
      {isPlaying ? (
        <button
          type="button"
          className="pause"
          aria-label="Pause"
          onClick={() => onPlayPauseClick(false)}
        >
          <FaPause />
        </button>
      ) : (
        <button
          type="button"
          className="play"
          aria-label="Play"
          onClick={() => onPlayPauseClick(true)}
        >
          <FaPlay />
        </button>
      )}
      <button
        type="button"
        className="next"
        aria-label="Next"
        onClick={onNextClick}
      >
        <FaForward />
      </button>
    </div>
  );
};

export default AudioControls;
