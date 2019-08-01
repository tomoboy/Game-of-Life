import { isMobile } from "react-device-detect";
import IconButton from "@material-ui/core/IconButton";
import FullScreen from "@material-ui/icons/Fullscreen";
import FullScreenExit from "@material-ui/icons/FullscreenExit";
import React, { useState } from "react";

export default () => {
  const [isFullScreen, setFullScreen] = useState<boolean>(false);
  const toggleFullscreen = () => {
    if (!isFullScreen) {
      document.documentElement.requestFullscreen();
      setFullScreen(true);
    } else {
      document.exitFullscreen();
      setFullScreen(false);
    }
  };
  return !isMobile ? (
    <IconButton color="inherit" onClick={toggleFullscreen}>
      {isFullScreen ? <FullScreenExit /> : <FullScreen />}
    </IconButton>
  ) : null;
};
