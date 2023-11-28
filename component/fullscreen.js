import React, { useState } from 'react';


const FullscreenToggle = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };

  return (
    <div>
      <button onClick={toggleFullscreen}>
        {isFullscreen ? '退出全屏' : '进入全屏'}
      </button>
    </div>
  );
};


export default FullscreenToggle;