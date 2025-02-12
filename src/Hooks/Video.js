import { useState, useCallback } from 'react';

const useVideoPlayer = () => {
  const [videoDuration, setVideoDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // Handle video load to get the duration
  const handleLoad = useCallback((data) => {
    setVideoDuration(data.duration);
  }, []);

  // Update current time as the video plays
  const handleProgress = useCallback((data) => {
    setCurrentTime(data.currentTime);
  }, []);

  // Calculate the time left in the video
  const timeLeft = Math.max(0, videoDuration - currentTime);

  // Format time in MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return {
    handleLoad,
    handleProgress,
    formattedTimeLeft: formatTime(timeLeft),
  };
};

export default useVideoPlayer;
