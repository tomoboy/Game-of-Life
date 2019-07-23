import { isMobile } from "react-device-detect";
import IconButton from "@material-ui/core/IconButton";
import { dispatchAction } from "../../baseStream$";
import { toggleFullScreen } from "../actions";
import FullScreen from "@material-ui/icons/Fullscreen";
import FullScreenExit from "@material-ui/icons/FullscreenExit";

import React from "react";
export default ({ isFullScreen }: { isFullScreen: boolean }) =>
  !isMobile ? (
    <IconButton
      onClick={() =>
        dispatchAction(toggleFullScreen({ isFullScreen: !isFullScreen }))
      }
    >
      {isFullScreen ? <FullScreenExit /> : <FullScreen />}
    </IconButton>
  ) : null;
