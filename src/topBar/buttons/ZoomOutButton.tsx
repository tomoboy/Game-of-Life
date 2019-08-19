import IconButton from "@material-ui/core/IconButton";
import { dispatchAction } from "../../streams/baseStream$";
import { zoom } from "../actions";
import ZoomOut from "@material-ui/icons/ZoomOut";
import React from "react";

export default () => (
  <IconButton
    color="inherit"
    onClick={() => dispatchAction(zoom({ zoom: -1 }))}
  >
    <ZoomOut />
  </IconButton>
);
