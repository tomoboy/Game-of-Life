import React from "react";
import "typeface-roboto";
import "./App.css";

import Fullscreen from "react-full-screen";
import ControlBoard from "./topBar/ControlBoard";
import BoardCanvas from "./board/Board";
import { connect } from "./streamUtils";
import { appSettings$ } from "./AppSettings$";
import Popup from "./Popup";
import { Shape } from "./types";

const App = ({
  isFullScreen,
  previewShape
}: {
  isFullScreen: boolean;
  previewShape: Shape;
}) => {
  return (
    <Fullscreen enabled={isFullScreen}>
      <ControlBoard />
      <BoardCanvas />
      {previewShape && <Popup previewShape={previewShape} />}
    </Fullscreen>
  );
};

export default connect(
  App,
  appSettings$
);
