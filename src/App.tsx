import React, { Component } from "react";
import "typeface-roboto";
import "./App.css";

import Fullscreen from "react-full-screen";
import ControlBoard from "./topBar/ControlBoard";
import BoardCanvas from "./board/Board";
import { connect } from "./streamUtils";
import { appSettings$ } from "./AppSettings$";

const App = ({ isFullScreen }: { isFullScreen: boolean }) => {
  return (
    <Fullscreen enabled={isFullScreen}>
      <ControlBoard />
      <BoardCanvas />
    </Fullscreen>
  );
};

export default connect(
  App,
  appSettings$
);
