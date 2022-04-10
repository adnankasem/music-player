import React, { useState, useEffect, useRef } from "react";
import AudioControls from "./AudioControls";

const AudioPlayer = ({ tracks, appRef }) => {
  const [trackIndex, setTrackIndex] = useState(0);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const { title, artist, audioSrc } = tracks[trackIndex];

  const audioRef = useRef(new Audio(audioSrc));
  const intervalRef = useRef();
  const isReady = useRef(false);
  const bgArray = [
    "#800000",
    "#00FFFF",
    "#7FFFD4",
    "#FF7F50",
    "#00008B",
    "#9932CC",
    "#FF00FF",
    "#E6E6FA",
    "#C71585",
  ];

  let [currentColor, setCurrentColor] = useState("");

  useEffect(() => {
    console.log("audioref", audioRef);
  }, []);

  const { duration } = audioRef.current;

  const toPrevTrack = () => {
    if (trackIndex - 1 < 0) {
      setTrackIndex(tracks.length - 1);
    } else {
      setTrackIndex(trackIndex - 1);
    }
  };

  const toNextTrack = () => {
    if (trackIndex < tracks.length - 1) {
      setTrackIndex(trackIndex + 1);
    } else {
      setTrackIndex(0);
    }
  };

  const startTimer = () => {
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        toNextTrack();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    audioRef.current.pause();

    audioRef.current = new Audio(audioSrc);
    setTrackProgress(audioRef.current.currentTime);
    let randomNumber = Math.floor(Math.random() * 9);
    console.log("randomNumber: ", randomNumber);

    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
      setCurrentColor(bgArray[randomNumber]);
      appRef.current.style.backgroundColor = currentColor;
    } else {
      isReady.current = true;
    }
  }, [trackIndex]);

  const onScrub = (value) => {
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
  };

  const onScrubEnd = () => {
    if (!isPlaying) {
      setIsPlaying(true);
    }

    startTimer();
  };

  return (
    <div className="audio-player">
      <div className="track-info">
        <h2 className="title">{title}</h2>
        <h3 className="artist">{artist}</h3>
        <AudioControls
          isPlaying={isPlaying}
          onPrevClick={toPrevTrack}
          onNextClick={toNextTrack}
          onPlayPauseClick={setIsPlaying}
        />
        <input
          type="range"
          value={trackProgress}
          step="1"
          min="0"
          max={duration ? duration : `${duration}`}
          className="progress"
          onChange={(e) => onScrub(e.target.value)}
          onMouseUp={onScrubEnd}
          onKeyUp={onScrubEnd}
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
