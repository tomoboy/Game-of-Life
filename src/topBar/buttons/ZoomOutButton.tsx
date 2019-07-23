import IconButton from "@material-ui/core/IconButton";
import { dispatchAction } from "../../baseStream$";
import { zoom } from "../actions";
import ZoomOut from "@material-ui/icons/ZoomOut";
import React from "react";

export default () => (
  <IconButton onClick={() => dispatchAction(zoom({ zoom: -1 }))}>
    <ZoomOut />
  </IconButton>
);
