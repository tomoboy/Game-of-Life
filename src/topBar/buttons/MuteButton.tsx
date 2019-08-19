import React from "react";
import { dispatchAction } from "../../streams/baseStream$";
import { toggleSound } from "../actions";
import IconButton from "@material-ui/core/IconButton";
import { VolumeOff, VolumeUp } from "@material-ui/icons";

export default ({ isSoundOn }: { isSoundOn: boolean }) => (
  <IconButton
    color="inherit"
    onClick={() => dispatchAction(toggleSound({ isSoundOn: !isSoundOn }))}
  >
    {isSoundOn ? <VolumeOff /> : <VolumeUp />}
  </IconButton>
);
