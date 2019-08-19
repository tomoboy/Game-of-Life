import React from "react";
import { dispatchAction } from "../../streams/baseStream$";
import { togglePlay } from "../actions";
import IconButton from "@material-ui/core/IconButton";
import { Pause, PlayArrow } from "@material-ui/icons";

export default ({ isPlaying }: { isPlaying: boolean }) => (
  <IconButton
    color="inherit"
    onClick={() => dispatchAction(togglePlay({ isPlaying: !isPlaying }))}
  >
    {isPlaying ? <Pause /> : <PlayArrow />}
  </IconButton>
);
