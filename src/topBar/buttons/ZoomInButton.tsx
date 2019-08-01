import { dispatchAction } from "../../baseStream$";
import { zoom } from "../actions";
import ZoomIn from "@material-ui/icons/ZoomIn";
import IconButton from "@material-ui/core/IconButton";
import React from "react";

export default () => (
  <IconButton onClick={() => dispatchAction(zoom({ zoom: 1 }))}>
    <ZoomIn />
  </IconButton>
);