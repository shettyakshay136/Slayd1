// VideoContext.js
import React, { createContext, useContext, useState } from 'react';

const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const [videoDuration, setVideoDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const handleLoad = (data) => {
    setVideoDuration(data.duration);
  };

  const handleProgress = (data) => {
    setCurrentTime(data.currentTime);
  };

  return (
    <VideoContext.Provider value={{ videoDuration, currentTime, handleLoad, handleProgress }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideoContext = () => useContext(VideoContext);
