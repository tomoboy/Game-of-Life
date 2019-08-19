import { dispatchAction } from "../../streams/baseStream$";
import { zoom } from "../actions";
import ZoomIn from "@material-ui/icons/ZoomIn";
import IconButton from "@material-ui/core/IconButton";
import React from "react";

export default () => (
  <IconButton color="inherit" onClick={() => dispatchAction(zoom({ zoom: 1 }))}>
    <ZoomIn />
  </IconButton>
);
